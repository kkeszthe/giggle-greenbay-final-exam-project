export class UserController {
  constructor(userService, errorCodes) {
    this.user = userService;
    this.post = this.post.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
    this.errorCodes = errorCodes;
    this.errorMessages = {
      [errorCodes.missingUsernameAndPassword]: {
        status: 400,
        message: 'Username and password are required.',
      },
      [errorCodes.missingUsername]: {
        status: 400,
        message: 'Username is reuired.',
      },
      [errorCodes.missingPassword]: {
        status: 400,
        message: 'Password is required.',
      },
      [errorCodes.invalidPassword]: {
        status: 400,
        message: 'Password is too short.',
      },
      [errorCodes.usedUsername]: {
        status: 400,
        message: 'Username is already taken.',
      },
      [errorCodes.missingParam]: {
        status: 400,
        message: 'Amount is missing.',
      },
      [errorCodes.invalidURL]: {
        status: 400,
        message: 'Valid URL is required.',
      },
    };
  }

  post(req, res) {
    const { username, password, photo_url } = req.body;
    this.user
      .add({ username, password, photo_url })
      .then(response => res.status(201).json(response))
      .catch(error => {
        const status = this.errorMessages[error.message]
          ? this.errorMessages[error.message].status
          : 400;
        const message = this.errorMessages[error.message]
          ? this.errorMessages[error.message].message
          : error.message;
        res.status(status).json({ error: message });
      });
  }

  updateBalance(req, res) {
    const { amount } = req.body;
    const { userId } = req.params;
    this.user
      .updateBalance({ userId, amount })
      .then(response => res.status(201).json(response))
      .catch(error => {
        const status = this.errorMessages[error.message]
          ? this.errorMessages[error.message].status
          : 400;
        const message = this.errorMessages[error.message]
          ? this.errorMessages[error.message].message
          : error.message;
        res.status(status).json({ error: message });
      });
  }
}
