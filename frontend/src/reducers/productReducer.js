import { SET_PRODUCT_SUCCESS } from '../constants/ActionTypes';
export function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
