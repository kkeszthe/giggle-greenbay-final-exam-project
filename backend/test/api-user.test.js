import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';

class duplicateError extends Error {
  constructor() {
    super();
    this.code = 'ER_DUP_ENTRY';
  }
}

describe('POST /users', () => {
  test('missing username and password returns error "Username and password are required."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({ kingdomname: 'mockedkingdom' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Username and password are required.');
        return done();
      });
  });

  test('missing username returns error "Username is reuired."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({ password: 'password', kingdomname: 'mockedkingdom' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Username is reuired.');
        return done();
      });
  });

  test('missing password returns error "Password is required."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({ username: 'superuser', kingdomname: 'mockedkingdom' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Password is required.');
        return done();
      });
  });

  test('missing URL returns error "URL is required."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({ username: 'superuser', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('URL is required.');
        return done();
      });
  });

  test('too short password returns error "Password is too short."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'superuser',
        password: 'secret',
        photo_url:
          'https://www.nicepng.com/png/full/914-9144016_avatar-pictures-anime-male-hair-reference.png',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Password is too short.');
        return done();
      });
  });

  test('invalid returns error "Invalid URL."', done => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'superuser',
        password: 'secret',
        photo_url: 'https://www.nicepng.',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Password is too short.');
        return done();
      });
  });

  test('username already in use returns error "Username is already taken."', done => {
    db.query.mockImplementationOnce(() => {
      throw new duplicateError();
    });
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'superuser',
        password: 'password',
        photo_url:
          'https://www.nicepng.com/png/full/914-9144016_avatar-pictures-anime-male-hair-reference.png',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Username is already taken.');
        return done();
      });
  });

  test('proper data returns object', done => {
    db.query.mockImplementation(() => ({ results: { insertId: 14 } }));

    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'username',
        password: 'password',
        photo_url:
          'https://www.nicepng.com/png/full/914-9144016_avatar-pictures-anime-male-hair-reference.png',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          id: 14,
          username: 'username',
        });
        return done();
      });
  });
});

describe('GET /users/:userId', () => {
  test('proper data returns object', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 14,
          username: 'username',
          photo_url:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          balance: 100,
        },
      ],
    }));

    request(app)
      .get('/api/users/11')
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          id: 14,
          username: 'username',
          photo_url:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          balance: 100,
        });
        return done();
      });
  });
});

describe('PUT /users/:userId', () => {
  jest.mock('jsonwebtoken', () => ({
    verify: () => {
      return { userId: 11 };
    },
  }));
  test('missing amount returns error "Missing amount"', done => {
    request(app)
      .put('/api/users/11/balance')
      .set('Accept', 'application/json')
      .send({})
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Amount is missing.');
        return done();
      });
  });

  test('proper data returns object', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 14,
          username: 'username',
          photo_url:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          balance: 100,
        },
      ],
    }));
    request(app)
      .put('/api/users/11/balance')
      .set('Accept', 'application/json')
      .send({
        amount: '100',
      })
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          id: 14,
          username: 'username',
          photo_url:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          balance: 100,
        });
        return done();
      });
  });
});
