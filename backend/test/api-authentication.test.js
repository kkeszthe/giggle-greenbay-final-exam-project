import request from 'supertest';
import app from '../src/app';

test('post: missing token returns error "Token is required."', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Token is required.');
      return done();
    });
});

test('post: invalid token returns error "Invalid token."', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set('token', 'invalidtoken')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Invalid token.');
      return done();
    });
});

test('valid token returns object', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
    )
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toEqual({
        userId: 11,
      });
      return done();
    });
});
