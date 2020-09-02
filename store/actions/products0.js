export const productActions = {
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
};

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
