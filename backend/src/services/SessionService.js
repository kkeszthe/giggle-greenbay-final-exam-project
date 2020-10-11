import jwt from 'jsonwebtoken';

export class SessionService {
  constructor(userService, errorCodes) {
    this.user = userService;
    this.errorCodes = errorCodes;
  }

  validateParams({ username, password }) {
    if (!username && !password)
      throw new Error(this.errorCodes.missingUsernameAndPassword);
    if (!username) throw new Error(this.errorCodes.missingUsername);
    if (!password) throw new Error(this.errorCodes.missingPassword);
  }

  getToken({ userId }) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret');
  }

  async login({ username, password }) {
    this.validateParams({ username, password });
    const user = await this.user.getByUsernameAndPassword({
      username,
      password,
    });
    if (user.length === 0)
      throw new Error(this.errorCodes.invalidUsernameAndPassword);
    return {
      token: this.getToken(user.userId),
      userId: user.id,
      username: user.username,
      photo_url: user.photo_url,
      balance: user.balance,
    };
  }

  verifyToken({ token }) {
    if (!token) throw new Error(this.errorCodes.missingToken);
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return { userId };
    } catch (error) {
      throw new Error(this.errorCodes.invalidToken);
    }
  }
}
