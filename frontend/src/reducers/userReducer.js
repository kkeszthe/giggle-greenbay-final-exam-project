import { SET_USER_SUCCESS } from '../constants/ActionTypes';
export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
