const initialState = {
  token: null,
  userId: null,
  didTryAL: false,
};

import { authActions } from '../actions/auth';

export default (state = initialState, action) => {
  switch (action.type) {
    // case authActions.LOGIN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case authActions.SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case authActions.AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAL: true,
      };
    case authActions.LOGOUT:
      return {
        token: null,
        userId: null,
        didTryAL: true,
      };
    case authActions.DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAL: true,
      };
    default:
      return state;
  }
};
