import * as types from '../constants/ActionTypes';
import { userReducer } from './userReducer';

describe('resource reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer([], {})).toEqual([]);
  });

  it('should handle SET_USER_SUCCESS', () => {
    expect(
      userReducer(null, {
        type: types.SET_USER_SUCCESS,
        payload: { username: 'username' },
      })
    ).toEqual({ username: 'username' });
  });
});
