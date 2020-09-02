export const productActions = {
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
};

export const deleteProduct = (productId) => {
  return { type: productActions.DELETE_PRODUCT, pId: productId };
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

    console.log(resData);

    dispatch({
      type: productActions.CREATE_PRODUCT,
      //productData: { title: title, description: description, imageUrl: imageUrl, price: price },
      //productData: { title, description, imageUrl, price },
      productData: { id: resData.name, title, description, imageUrl, price },
    });
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
