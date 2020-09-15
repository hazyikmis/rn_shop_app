import { FIREBASE_API_KEY } from '@env';

import { AsyncStorage } from 'react-native';

export const authActions = {
  //SIGNUP: 'SIGNUP',
  //LOGIN: 'LOGIN',
  AUTHENTICATE: 'AUTHENTICATE',
  LOGOUT: 'LOGOUT',
  DID_TRY_AUTO_LOGIN: 'DID_TRY_AUTO_LOGIN',
};

let timer;

export const didAutoLoginTry = () => {
  return { type: authActions.DID_TRY_AUTO_LOGIN };
};

//export const authenticate = (userId, token) => {
export const authenticate = (userId, token, expiryTime) => {
  // setLogoutTimer(); //I need to call also this, but structure is not ok
  // return { type: authActions.AUTHENTICATE, userId, token };
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: authActions.AUTHENTICATE, userId, token });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      //throw new Error('SIGNUP: Something went wrong!');
      const errorResData = await response.json();
      //console.log(errorResData);
      const errorMessage = errorResData.error.message;

      let errMessage = 'Something went wrong!';
      if (errorMessage === 'EMAIL_EXISTS') {
        errMessage = 'The email address is already in use by another account!';
      } else if (errorMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errMessage =
          'All requests from this device blocked due to unusual activity. Try again later!';
      }
      throw new Error(errMessage);
    }

    const resData = await response.json();
    // console.log(resData);
    //dispatch({ type: authActions.SIGNUP, token: resData.idToken, userId: resData.localId });
    //dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      //throw new Error('LOGIN: Something went wrong!');
      const errorResData = await response.json();
      //console.log(errorResData);
      const errorMessage = errorResData.error.message;

      let errMessage = 'Something went wrong!';
      if (
        errorMessage === 'EMAIL_NOT_FOUND' ||
        errorMessage === 'INVALID_PASSWORD'
      ) {
        errMessage = 'This email/password is not valid!';
      } else if (errorMessage === 'USER_DISABLED') {
        errMessage = 'The user account has been disabled by an administrator.!';
      }
      throw new Error(errMessage);
    }

    const resData = await response.json();
    // console.log(resData);
    // dispatch({
    //   type: authActions.LOGIN,
    //   token: resData.idToken,
    //   userId: resData.localId,
    // });
    //dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: authActions.LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

//kicking the user logout after expiration of token is not a good idea!
//especially while he/she using the app, only meaningful if he/she is idle
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
    //}, expirationTime / 1000); //testing auto logout after token expires
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
