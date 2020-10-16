import { UserService } from './UserService';
import { errorCodes } from '../repos/errorCodes';

const userRepo = {
  add: () => {
    return {
      insertId: 14,
    };
  },
  getById: () => {
    return [
      {
        id: 14,
        username: 'username',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        balance: 100,
      },
    ];
  },
  getByUsernameAndPassword: () => {
    return [
      {
        id: 14,
        username: 'username',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        balance: 100,
      },
    ];
  },
  updateBalance: () => {
    return { changedRows: 1 };
  },
};

const userService = new UserService({ userRepo, errorCodes });

const success = {
  add: {
    id: 14,
    username: 'username',
  },
  get: {
    id: 14,
    username: 'username',
    photo_url:
      'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
    balance: 100,
  },
  update: {
    id: 14,
    username: 'username',
    photo_url:
      'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
    balance: 100,
  },
};

describe('UserService.add', () => {
  test('Missing username and password', async () => {
    try {
      await userService.add({
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });
  test('Missing username', async () => {
    try {
      await userService.add({
        password: 'password',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(101));
    }
  });
  test('Missing password', async () => {
    try {
      await userService.add({
        username: 'username',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(102));
    }
  });
  test('Missing URL', async () => {
    try {
      await userService.add({ username: 'username', password: 'password' });
    } catch (err) {
      expect(err).toStrictEqual(Error(106));
    }
  });
  test('Invalid password', async () => {
    try {
      await userService.add({
        username: 'username',
        password: 'passwor',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(202));
    }
  });
  test('Invalid URL', async () => {
    try {
      await userService.add({
        username: 'username',
        password: 'password',
        photo_url: 'photo_url',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(208));
    }
  });
  test('Valid request', async () => {
    const result = await userService.add({
      username: 'username',
      password: 'password',
      photo_url:
        'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
    });
    expect(result).toStrictEqual(success.add);
  });
});
describe('UserService.getByUsernameAndPassword', () => {
  test('Missing username and password', async () => {
    try {
      await userService.getByUsernameAndPassword({});
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });
  test('Missing username', async () => {
    try {
      await userService.getByUsernameAndPassword({
        password: 'password',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(101));
    }
  });
  test('Missing password', async () => {
    try {
      await userService.getByUsernameAndPassword({
        username: 'username',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(102));
    }
  });
  test('Valid request', async () => {
    const result = await userService.getByUsernameAndPassword({
      username: 'username',
      password: 'password',
    });
    expect(result).toStrictEqual(success.get);
  });
});
describe('UserService.getById', () => {
  test('Missing userId', async () => {
    try {
      await userService.getById({});
    } catch (err) {
      expect(err).toStrictEqual(Error(103));
    }
  });
  test('Valid request', async () => {
    const result = await userService.getById({
      userId: '14',
    });
    expect(result).toStrictEqual(success.get);
  });
});
describe('UserService.updateBalance', () => {
  test('Missing userId', async () => {
    try {
      await userService.updateBalance({ amount: 100 });
    } catch (err) {
      expect(err).toStrictEqual(Error(103));
    }
  });
  test('Valid request', async () => {
    const result = await userService.updateBalance({
      userId: '14',
      amount: 100,
    });
    expect(result).toStrictEqual(success.update);
  });
});
