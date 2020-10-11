export class ProductController {
  constructor(productService, errorCodes) {
    this.product = productService;
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
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
        message: 'Product name, description, or seller is missing.',
      },
      [errorCodes.invalidBalance]: {
        status: 400,
        message: 'Insufficient funds.',
      },
      [errorCodes.invalidPrice]: {
        status: 400,
        message: 'Price must be whole number and higher than zero.',
      },
      [errorCodes.invalidURL]: {
        status: 400,
        message: 'Valid URL is required.',
      },
      [errorCodes.usedUserId]: {
        status: 400,
        message: 'Item already sold.',
      },
      [errorCodes.invalidProductId]: {
        status: 400,
        message: 'Item not found.',
      },
    };
  }

  post(req, res) {
    const { product_name, description, photo_url, price, seller_id } = req.body;
    this.product
      .add({ product_name, description, photo_url, price, seller_id })
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

  get(req, res) {
    this.product
      .getSellableProducts()
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

  put(req, res) {
    const { userId } = req.body;
    const { productId } = req.params;
    this.product
      .sellProduct({ productId, userId })
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
