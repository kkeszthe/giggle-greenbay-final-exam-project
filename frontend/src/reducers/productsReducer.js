import {
  UPDATE_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
} from '../constants/ActionTypes';
export function productsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_PRODUCTS_SUCCESS:
      return action.payload;
    case ADD_PRODUCT_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}
