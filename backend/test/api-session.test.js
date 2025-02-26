import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';
db.query.mockImplementation(() => ({ results: [{ userId: 2, kingdomId: 3 }] }));
//import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken', () => ({
  sign: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA',
}));

test('missing username and password returns error "Username and password are required."', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({})
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Username and password are required.');
      return done();
    });
});

test('missing username returns error "Username is reuired."', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ password: 'password' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Username is reuired.');
      return done();
    });
});

test('missing password returns error "Password is required."', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'superuser' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Password is required.');
      return done();
    });
});

test('invalid data returns error "Invalid username or password."', done => {
  db.query.mockImplementation(() => ({ results: [] }));
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'superuser', password: 'password' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Invalid username or password.');
      return done();
    });
});

test('proper data returns token', done => {
  db.query.mockImplementation(() => ({
    results: [{ userId: 2, kingdomId: 3 }],
  }));
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'superuser', password: 'password' })
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      if (err) return done(err);

      expect(data.body.token).toEqual(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.Q4R2rKXPc6_f2pJ4SBYTSt1LGd6UVt1lFTzmmDb35PA'
      );
      return done();
    });
});
