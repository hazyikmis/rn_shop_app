export const productActions = {
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

export const deleteProduct = (productId) => {
  return { type: productActions.DELETE_PRODUCT, pId: productId };
};
