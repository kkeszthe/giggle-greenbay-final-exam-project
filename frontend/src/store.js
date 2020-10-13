import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from './reducers/userReducer';
import { productsReducer } from './reducers/productsReducer';
import { tokenReducer } from './reducers/tokenReducer';
import { errorReducer } from './reducers/errorReducer';

function root(state = {}, action) {
  return {
    user: userReducer(state.user, action),
    products: productsReducer(state.troops, action),
    token: tokenReducer(state.token, action),
    error: errorReducer(state.error, action),
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  root,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export { store };
