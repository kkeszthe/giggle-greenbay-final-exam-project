import * as types from '../constants/ActionTypes';
import { productsReducer } from './productsReducer';

describe('products reducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer([], {})).toEqual([]);
  });

  it('should handle UPDATE_PRODUCTS_SUCCESS', () => {
    expect(
      productsReducer([], {
        type: types.UPDATE_PRODUCTS_SUCCESS,
        payload: [{ id: 1, level: 1 }],
      })
    ).toEqual([{ id: 1, level: 1 }]);

    expect(
      productsReducer([{ id: 1, level: 1 }], {
        type: types.UPDATE_PRODUCTS_SUCCESS,
        payload: [
          { id: 1, level: 1 },
          { id: 2, level: 1 },
        ],
      })
    ).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 1 },
    ]);

    expect(
      productsReducer([{ id: 1, level: 1 }], {
        type: types.UPDATE_PRODUCTS_SUCCESS,
        payload: [{ id: 2, level: 1 }],
      })
    ).toEqual([{ id: 2, level: 1 }]);
  });

  it('should handle ADD_PRODUCT_SUCCESS', () => {
    expect(
      productsReducer([], {
        type: types.ADD_PRODUCT_SUCCESS,
        payload: { id: 1, level: 1 },
      })
    ).toEqual([{ id: 1, level: 1 }]);

    expect(
      productsReducer([{ id: 1, level: 1 }], {
        type: types.ADD_PRODUCT_SUCCESS,
        payload: { id: 2, level: 1 },
      })
    ).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 1 },
    ]);
  });
});
