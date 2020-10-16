import { ProductService } from './ProductService';
import { errorCodes } from '../repos/errorCodes';

const userService = {
  getById: () => {
    return {
      id: 14,
      username: 'username',
      photo_url:
        'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      balance: 100,
    };
  },
  updateBalance: () => {
    return { changedRows: 1 };
  },
};

const productRepo = {
  add: () => {
    return { insertId: 1 };
  },
  getSellableProducts: () => {
    return [
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
    ];
  },
  getById: () => {
    return [
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
    ];
  },
  sellProduct: () => {
    return { changedRows: 1 };
  },
};

const productService = new ProductService({
  userService,
  productRepo,
  errorCodes,
});

const success = {
  add: {
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
  get: {
    products: [
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
  },
  getById: {
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
  update: {
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
};

describe('ProductService.add', () => {
  test('Missing product details', async () => {
    try {
      await productService.add({});
    } catch (err) {
      expect(err).toStrictEqual(Error(100));
    }
  });
  test('Missing URL', async () => {
    try {
      await productService.add({
        product_name: 'product_name',
        description: 'description',

        price: 10,
        seller_id: 1,
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(106));
    }
  });
  test('Invalid price', async () => {
    try {
      await productService.add({
        product_name: 'product_name',
        description: 'description',
        photo_url:
          'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
        price: -1,
        seller_id: 1,
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(207));
    }
  });
  test('Invalid URL', async () => {
    try {
      await productService.add({
        product_name: 'product_name',
        description: 'description',
        photo_url: 'https://www.nordmet',
        price: 10,
        seller_id: 1,
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(208));
    }
  });
  test('Valid request', async () => {
    const result = await productService.add({
      product_name: 'product_name',
      description: 'description',
      photo_url:
        'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
      price: 10,
      seller_id: 1,
    });
    expect(result).toStrictEqual(success.add);
  });
});
describe('ProductService.getSellableProducts', () => {
  test('Valid request', async () => {
    const result = await productService.getSellableProducts({});
    expect(result).toStrictEqual(success.get);
  });
});
describe('ProductService.getById', () => {
  test('Missing productId', async () => {
    try {
      await productService.getById({});
    } catch (err) {
      expect(err).toStrictEqual(Error(103));
    }
  });
  test('Valid request', async () => {
    const result = await productService.getById({
      productId: '1',
    });
    expect(result).toStrictEqual(success.getById);
  });
});
describe('ProductService.sellProduct', () => {
  test('Missing details', async () => {
    try {
      await productService.sellProduct({ amount: 100 });
    } catch (err) {
      expect(err).toStrictEqual(Error(100));
    }
  });
  test('Valid request', async () => {
    const result = await productService.sellProduct({
      userId: 1,
      productId: 1,
    });
    expect(result).toStrictEqual(success.update);
  });
});
