import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../.././services/fetchService');
import { generalFetch } from '../../services/fetchService';

import Header from './Header';
import { store } from '../../store';

const history = createMemoryHistory({
  initialEntries: ['/'],
});
const mockStore = configureStore([]);

generalFetch.mockImplementation(() =>
  Promise.resolve({
    id: 11,
    username: 'sal8',
    photo_url:
      'https://www.nordmet.se/wp-content/uploads/2017/11/Siluett-med-spelarprofilbild-2.jpg',
    balance: 100,
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

it('renders Header without crashing without token', async () => {
  const mockedStore = mockStore({
    user: {},
    products: [],
    product: {},
    token: '',
  });
  mockedStore.dispatch = jest.fn();

  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('renders Header without crashing with token', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy';
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('matches snapshot without token', async () => {
  const mockedStore = mockStore({
    user: {},
    products: [],
    product: {},
    token: '',
  });
  mockedStore.dispatch = jest.fn();

  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token and user', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy';
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});
