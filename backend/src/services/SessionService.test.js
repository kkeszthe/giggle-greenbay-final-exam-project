import { SessionService } from './SessionService';
import { errorCodes } from '../repos/errorCodes';

jest.mock('jsonwebtoken', () => ({
  sign: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
}));

const userService = {
  getByUsernameAndPassword: () => {
    return {
      id: 14,
      username: 'username',
      photo_url:
        'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      balance: 100,
    };
  },
};

const sessionService = new SessionService({ userService, errorCodes });

const success = {
  get: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
    id: 14,
    username: 'username',
    photo_url:
      'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
    balance: 100,
  },
};

describe('SessionService.login', () => {
  test('Missing username and password', async () => {
    try {
      await sessionService.login({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });
  test('Missing username', async () => {
    try {
      await sessionService.login({
        password: 'password',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(101));
    }
  });
  test('Missing password', async () => {
    try {
      await sessionService.login({
        username: 'username',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(102));
    }
  });
  test('Invalid username or password', async () => {
    try {
      await sessionService.login({
        username: 'usernam',
        password: 'passwor',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(204));
    }
  });
  test('Valid request', async () => {
    const result = await sessionService.login({
      username: 'username',
      password: 'password',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
    });
    expect(result).toStrictEqual(success.get);
  });
});
