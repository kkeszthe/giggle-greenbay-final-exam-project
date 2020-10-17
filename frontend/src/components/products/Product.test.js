import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

import Product from './Product';
import { store } from '../../store';
jest.mock('../.././services/fetchService');
import { generalFetch } from '../../services/fetchService';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ productId: '1' }),
}));

generalFetch.mockImplementation(() =>
  Promise.resolve({
    id: 15,
    product_name: 'practice',
    description: 'dfghjkéá-l.kg,jhvmnbdvésliretzhulkejsd',
    product_photo:
      'https://doopshop.hu/wp-content/uploads/2019/05/SPIGEN-AIRSKIN-IPHONE-XR-BLACK.jpg',
    price: 12,
    seller_id: 11,
    buyer_id: 11,
    seller_name: 'sal8',
    seller_photo:
      'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
  })
);

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Product tests', () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy';
  });

  it('matches snapeshot', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Product
            open={true}
            setOpen={() => {}}
            match={{ params: { productId: 1 }, isExact: true }}
          />
        </Provider>,
        container
      );
    });

    expect(container.innerHTML);
  });
});
