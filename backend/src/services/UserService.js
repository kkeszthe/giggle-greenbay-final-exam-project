export class UserService {
  constructor(userRepo, errorCodes) {
    this.user = userRepo;
    this.errorCodes = errorCodes;
  }

  validateParams({ username, password }) {
    if (!username && !password)
      throw new Error(this.errorCodes.missingUsernameAndPassword);
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
  }

  validateURL(string) {
    var pattern = new RegExp(
      '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?'
    );
    return pattern.test(string);
  }

  async add({ username, password, photo_url }) {
    this.validateParams({ username, password });
    if (photo_url || this.validateURL(photo_url))
      throw new Error(this.errorCodes.invalidURL);
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
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    return (await this.user.getAuthentication({ username, password }))[0];
  }

  async getById({ userId }) {
    return (await this.user.getById({ userId }))[0];
  }

  async updateBalance({ userId, amount }) {
    if (!amount) throw new Error(this.errorCodes.missingParam);
    const balance = ((await this.getById({ userId })).balance += parseInt(
      amount
    ));
    await this.user.updateBalance({ userId, balance });
    return await this.getById({ userId });
  }
}
