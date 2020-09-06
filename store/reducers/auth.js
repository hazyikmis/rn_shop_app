const initialState = {
  token: null,
  userId: null,
};

import { authActions } from '../actions/auth';

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case authActions.SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
