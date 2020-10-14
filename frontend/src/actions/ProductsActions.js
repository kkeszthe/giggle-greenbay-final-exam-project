import {
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  SET_ERROR_SUCCESS,
  SET_PRODUCT,
  SET_PRODUCT_SUCCESS,
} from '../constants/ActionTypes';
import { generalFetch } from '../services/fetchService';

export const getProductsAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PRODUCTS,
    });

    return generalFetch('products', {
      method: 'GET',
      token: getState().token,
    }).then(
      response =>
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_PRODUCTS_SUCCESS,
              payload: response.products,
            }),
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
    );
  };
};

export const getProductAction = productId => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PRODUCT,
    });

    return generalFetch(`products/${productId}`, {
      method: 'GET',
      token: getState().token,
    })
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          dispatch({
            type: SET_PRODUCT_SUCCESS,
            payload: data,
          });

          return true;
        }
      })
      .then(result => result);
  };
};

export const buyProductAction = productId => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PRODUCT,
    });

    return generalFetch(`products/${productId}`, {
      method: 'PUT',
      token: getState().token,
      body: {
        userId: localStorage.user,
      },
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: SET_PRODUCT_SUCCESS,
              payload: response,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};

export const addProductAction = (
  product_name,
  description,
  photo_url,
  price
) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_PRODUCT,
    });

    return generalFetch('products', {
      method: 'POST',
      token: getState().token,
      body: {
        product_name,
        description,
        photo_url,
        price,
        seller_id: localStorage.user,
      },
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: ADD_PRODUCT_SUCCESS,
              payload: response,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};
