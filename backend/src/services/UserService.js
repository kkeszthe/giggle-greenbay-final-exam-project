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
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(string);
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
    console.log(userId);
    return (await this.user.getById({ userId }))[0];
  }

  async updateBalance({ userId, amount }) {
    if (!amount) throw new Error(this.errorCodes.missingParam);
    console.log(amount);
    const balance = ((await this.getById({ userId })).balance += amount);
    await this.user.updateBalance({ userId, balance });
    return balance;
  }
}
