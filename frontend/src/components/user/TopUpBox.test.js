import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import TopUpBox from './TopUpBox';
import { store } from '../../store';

global.fetch = jest.fn(async () => {
  return await Promise.resolve({
    json: () =>
      Promise.resolve({
        products: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      }),
  });
});

let container;

beforeEach(() => {
  fetch.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('TopUpBox tests', () => {
  it('should dispatch an action when clicked', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      user: {
        username: 'username',
        photo_url: 'https://www.nordmet.se/wp-con…ild-2.jpg',
        balance: 100,
      },
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
    await act(async () => {
      render(
        <Provider store={mockedStore}>
          <TopUpBox open={true} setOpen={() => {}} />
        </Provider>,
        container
      );
    });

    const button = document.getElementsByClassName('TopUpBTN')[0];
    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('matches snapeshot', async () => {
    Storage.prototype.getItem = jest.fn(key => {
      return 'dummy';
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <TopUpBox open={true} setOpen={() => {}} />
        </Provider>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
