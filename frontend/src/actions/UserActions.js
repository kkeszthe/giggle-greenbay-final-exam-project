import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';
import { generalFetch } from '../services/fetchService';

export const getUserAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER,
    });

    return generalFetch(`users/${localStorage.user}`, {
      method: 'GET',
      token: getState().token,
    })
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          dispatch({
            type: SET_USER_SUCCESS,
            payload: data,
          });

          return true;
        }
      })
      .then(result => result);
  };
};

export const updateUserBalanceAction = amount => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER,
    });

    return generalFetch(`users/${localStorage.user}/balance`, {
      method: 'PUT',
      token: getState().token,
      body: { amount },
    })
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          dispatch({
            type: SET_USER_SUCCESS,
            payload: data,
          });

          return true;
        }
      })
      .then(result => result);
  };
};
