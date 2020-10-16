export class UserService {
  constructor({ userRepo, errorCodes }) {
    this.user = userRepo;
    this.errorCodes = errorCodes;
  }

  validateParams({ username, password, photo_url }) {
    if (!username && !password)
      throw new Error(this.errorCodes.missingUsernameAndPassword);
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    if (!photo_url) throw new Error(this.errorCodes.missingUrl);
    if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
    if (!this.validateURL(photo_url))
      throw new Error(this.errorCodes.invalidUrl);
  }

  validateURL(string) {
    var pattern = new RegExp(
      '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?'
    );
    return pattern.test(string);
  }

  async add({ username, password, photo_url }) {
    this.validateParams({ username, password, photo_url });
    const defaultBalance = 0;
    const userId = (
      await this.user.add({
        username,
        password,
        photo_url,
        balance: defaultBalance,
      })
    ).insertId;

    return {
      id: userId,
      username: username,
    };
  }

  async getByUsernameAndPassword({ username, password }) {
    if (!username && !password)
      throw new Error(this.errorCodes.missingUsernameAndPassword);
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    return (
      await this.user.getByUsernameAndPassword({ username, password })
    )[0];
  }

  async getById({ userId }) {
    if (!userId) throw new Error(this.errorCodes.missingUserId);
    return (await this.user.getById({ userId }))[0];
  }

  async updateBalance({ userId, amount }) {
    if (!userId) throw new Error(this.errorCodes.missingUserId);
    if (!amount) throw new Error(this.errorCodes.missingParam);
    const balance = ((await this.getById({ userId })).balance += parseInt(
      amount
    ));
    await this.user.updateBalance({ userId, balance });
    return await this.getById({ userId });
  }
}
