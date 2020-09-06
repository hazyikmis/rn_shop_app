export const productActions = {
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS', //to retrieve products from firebase db
};

import Product from '../../models/product';

//we have changed the rules on the firebase db as below:
/*
{
  "rules": {
    ".read": "now < 1601589600000",  // 2020-10-2
    //".write": "now < 1601589600000",  // 2020-10-2
    ".write": "auth != null",  // 2020-10-2
  }
}
*/
//This means that, in order to write to db, we need to send a valid token!
//How to send a token: https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_id_token
//just add "auth" param to the query string!
export const updateProduct = (id, title, description, imageUrl) => {
  //redux thunk allow us to access to current store from here by using "getState"
  //we need to retrieve token & userId from the "auth" portion of redux store

  //return async (dispatch) => {
  return async (dispatch, getState) => {
    //console.log(getState);
    const token = getState().auth.token;

    //await fetch(
    //since we started to check "response.ok", then we need to assign fetch result to response
    const response = await fetch(
      //`https://rn-shop-app-5b06a.firebaseio.com/products/${id}.json/`,
      `https://rn-shop-app-5b06a.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          //price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: productActions.UPDATE_PRODUCT,
      //productData: { title: title, description: description, imageUrl: imageUrl},
      productId: id,
      productData: { title, description, imageUrl },
    });
  };
};

export const deleteProduct = (productId) => {
  //return async (dispatch) => {
  return async (dispatch, getState) => {
    //console.log(getState);
    const token = getState().auth.token;

    //await fetch(
    //since we started to check "response.ok", then we need to assign fetch result to response
    const response = await fetch(
      `https://rn-shop-app-5b06a.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({ type: productActions.DELETE_PRODUCT, pId: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  //return async (dispatch) => {
  return async (dispatch, getState) => {
    //console.log(getState);
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //you can execute any async code you want!
    //the dispatch function below is the actual dispatching operation to reducers
    //and handled by ReduxThunk middleware
    const response = await fetch(
      'https://rn-shop-app-5b06a.firebaseio.com/products.json?auth=${token}',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    //    console.log(resData);

    dispatch({
      type: productActions.CREATE_PRODUCT,
      //productData: { title: title, description: description, imageUrl: imageUrl, price: price },
      //productData: { title, description, imageUrl, price },
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const fetchProducts = () => {
  //return async (dispatch) => {
  return async (dispatch, getState) => {
    //console.log(getState);
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-shop-app-5b06a.firebaseio.com/products.json/'
      );
      //DEFAULT fetch statement is GET type and no need to send headers & body

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      //fetched data is like {{key: value}, {key: value}, ...} //keys are string and values are also object
      //so we need to convert it array of objects
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            //'u1',
            resData[key].ownerId, //not u1' anymore
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      //console.log(resData);
      dispatch({
        type: productActions.FETCH_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};

/*
//WITHOUT ReduxThunk

export const deleteProduct = (productId) => {
  return { type: productActions.DELETE_PRODUCT, pId: productId };
};
export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: productActions.CREATE_PRODUCT,
    //productData: { title: title, description: description, imageUrl: imageUrl, price: price },
    productData: { title, description, imageUrl, price },
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: productActions.UPDATE_PRODUCT,
    //productData: { title: title, description: description, imageUrl: imageUrl},
    productId: id,
    productData: { title, description, imageUrl },
  };
};
*/
