import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';

describe('POST /products', () => {
  test('missing product details returns error "Product details are required."', done => {
    request(app)
      .post('/api/products')
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
        expect(data.body.error).toBe('Product details are required.');
        return done();
      });
  });

  test('missing URL returns error "URL is required."', done => {
    request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send({
        product_name: 'product_name',
        description: 'description',
        price: 10,
        seller_id: 1,
      })
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('URL is required.');
        return done();
      });
  });

  test('invalid price returns error "Price must be whole number and higher than zero."', done => {
    request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send({
        product_name: 'product_name',
        description: 'description',
        photo_url:
          'https://www.nicepng.com/png/full/914-9144016_avatar-pictures-anime-male-hair-reference.png',
        price: -1,
        seller_id: 1,
      })
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe(
          'Price must be whole number and higher than zero.'
        );
        return done();
      });
  });

  test('proper data returns object', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 'price',
          seller_id: 1,
          buyer_id: null,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        },
      ],
    }));

    request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send({
        product_name: 'product_name',
        description: 'description',
        photo_url:
          'https://www.nicepng.com/png/full/914-9144016_avatar-pictures-anime-male-hair-reference.png',
        price: 10,
        seller_id: 1,
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
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 'price',
          seller_id: 1,
          buyer_id: null,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        });
        return done();
      });
  });
});

describe('GET /products', () => {
  db.query.mockImplementation(() => ({
    results: [
      {
        id: 1,
        product_name: 'product_name',
        description: 'description',
        product_photo:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        price: 'price',
        seller_id: 1,
        buyer_id: null,
        seller_name: 'seller_name',
        seller_photo:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      },
    ],
  }));
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
      .get('/api/products')
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          products: [
            {
              id: 14,
              username: 'username',
              photo_url:
                'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
              balance: 100,
            },
          ],
        });
        return done();
      });
  });
});

describe('GET /products/:productId', () => {
  db.query.mockImplementation(() => ({
    results: [
      {
        id: 1,
        product_name: 'product_name',
        description: 'description',
        product_photo:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        price: 'price',
        seller_id: 1,
        buyer_id: null,
        seller_name: 'seller_name',
        seller_photo:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      },
    ],
  }));
  test('proper data returns object', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 'price',
          seller_id: 1,
          buyer_id: null,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        },
      ],
    }));

    request(app)
      .get('/api/products/11')
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MDI3MTkxOTB9.mdSdTPr8oZSS_qTAOiF2BoJHe32dPYVHyLkWciJZ4Jc'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 'price',
          seller_id: 1,
          buyer_id: null,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        });
        return done();
      });
  });
});

describe('PUT /products/:productId', () => {
  jest.mock('jsonwebtoken', () => ({
    verify: () => {
      return { userId: 11 };
    },
  }));

  test('proper data returns object', done => {
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 10,
          seller_id: 1,
          buyer_id: null,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
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
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 10,
          seller_id: 1,
          buyer_id: 14,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        },
      ],
    }));

    request(app)
      .put('/api/products/1')
      .set('Accept', 'application/json')
      .send({
        userId: '14',
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
          id: 1,
          product_name: 'product_name',
          description: 'description',
          product_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
          price: 10,
          seller_id: 1,
          buyer_id: 14,
          seller_name: 'seller_name',
          seller_photo:
            'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        });
        return done();
      });
  });
});
