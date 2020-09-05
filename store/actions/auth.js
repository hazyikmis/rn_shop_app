import { FIREBASE_API_KEY } from '@env';

const authActions = {
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
      throw new Error('SIGNUP: Something went wrong!');
    }

    const resData = await response.json();

    console.log(resData);

    await dispatch({ type: authActions.SIGNUP });
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
      throw new Error('LOGIN: Something went wrong!');
    }

    const resData = await response.json();

    console.log(resData);

    await dispatch({ type: authActions.LOGIN });
  };
};
