export class UserRepo {
  constructor(db, errorCodes) {
    (this.db = db),
      (this.errorCodes = errorCodes),
      (this.table = {
        name: 'users',
        columns: {
          id: 'id',
          username: 'username',
          password: 'password',
          photo_url: 'photo_url',
          balance: 'balance',
        },
      });
  }

  async add({ username, password, photo_url, balance }) {
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    try {
      return (
        await this.db.query(
          `INSERT INTO ${this.table.name} (${this.table.columns.username}, ${this.table.columns.password}, ${this.table.columns.photo_url}, ${this.table.columns.balance}) VALUES ("${username}", "${password}", "${photo_url}", ${balance});`
        )
      ).results;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new Error(this.errorCodes.usedUsername);
      throw error;
    }
  }

  async getByName({ username }) {
    if (!username) throw new Error(this.errorCodes.missingUsername);

    const user = (
      await this.db.query(
        `SELECT ${this.table.columns.id}, ${this.table.columns.username}, ${this.table.columns.photo_url}, ${this.table.columns.balance} FROM ${this.table.name} WHERE ${this.table.columns.username}=${username}`
      )
    ).results;
    if (user.length === 0)
      throw new Error(this.errorCodes.invalidUserNameAndPassword);
    return user;
  }

  async getById({ userId }) {
    if (!userId) throw new Error(this.errorCodes.missingUserId);

    const user = (
      await this.db.query(
        `SELECT ${this.table.columns.id}, ${this.table.columns.username}, ${this.table.columns.photo_url}, ${this.table.columns.balance} FROM ${this.table.name} WHERE ${this.table.columns.id}=${userId}`
      )
    ).results;
    if (user.length === 0)
      throw new Error(this.errorCodes.invalidUsernameAndPassword);
    return user;
  }

  async getAuthentication({ username, password }) {
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    return (
      await this.db.query(
        `SELECT ${this.table.columns.id}, ${this.table.columns.username}, ${this.table.columns.photo_url}, ${this.table.columns.balance} FROM ${this.table.name} WHERE ${this.table.columns.username}="${username}" AND ${this.table.columns.password}="${password}"`
      )
    ).results;
  }

  async updateBalance({ userId, balance }) {
    return (
      await this.db.query(
        `UPDATE ${this.table.name} SET  ${this.table.columns.balance}=${balance} WHERE ${this.table.columns.id}=${userId}`
      )
    ).results;
  }
}
