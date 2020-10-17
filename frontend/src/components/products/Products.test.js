import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Products from './Products';
import { store } from '../../store';
jest.mock('../.././services/fetchService');
import { generalFetch } from '../../services/fetchService';

generalFetch.mockImplementation(() =>
  Promise.resolve([
    {
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
    },
    {
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
    },
  ])
);

const mockStore = configureStore([]);
const mockedStore = mockStore({
  user: { username: 'username' },
  products: [
    {
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
    },
  ],
});
mockedStore.dispatch = jest.fn();

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

it('should dispatch an action when rendered', async () => {
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Products />
      </Provider>,
      container
    );
  });
  expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
});

it('matches snapeshot', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy';
  });

  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Products />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});
