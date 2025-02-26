import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_TOKEN_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';
import { generalFetch } from '../services/fetchService';

export const loginAction = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
    });

    return generalFetch('sessions', {
      method: 'POST',
      body: { username, password },
    })
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.id);
          dispatch({
            type: SET_USER_SUCCESS,
            payload: data,
          });
          dispatch({ type: SET_TOKEN_SUCCESS, payload: data.token });

          return true;
        }
      })
      .then(result => result);
  };
};
