import { FIREBASE_API_KEY } from '@env';

export const authActions = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
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
    await dispatch({
      type: authActions.SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
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
    await dispatch({
      type: authActions.LOGIN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};
