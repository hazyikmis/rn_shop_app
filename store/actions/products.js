export const productActions = {
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS', //to retrieve products from firebase db
};

import Product from '../../models/product';

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    //await fetch(
    //since we started to check "response.ok", then we need to assign fetch result to response
    const response = await fetch(
      `https://rn-shop-app-5b06a.firebaseio.com/products/${productId}.json/`,
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
  return async (dispatch) => {
    //you can execute any async code you want!
    //the dispatch function below is the actual dispatching operation to reducers
    //and handled by ReduxThunk middleware
    const response = await fetch(
      'https://rn-shop-app-5b06a.firebaseio.com/products.json/',
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
        }),
      }
    );

    const resData = await response.json();

    //    console.log(resData);

    dispatch({
      type: productActions.CREATE_PRODUCT,
      //productData: { title: title, description: description, imageUrl: imageUrl, price: price },
      //productData: { title, description, imageUrl, price },
      productData: { id: resData.name, title, description, imageUrl, price },
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    //await fetch(
    //since we started to check "response.ok", then we need to assign fetch result to response
    const response = await fetch(
      `https://rn-shop-app-5b06a.firebaseio.com/products/${id}.json/`,
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

export const fetchProducts = () => {
  return async (dispatch) => {
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
            'u1',
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
