export const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

//addToCart action creator
export const addToCart = (product) => {
  return { type: cartActions.ADD_TO_CART, product };
};

//removeFromCart action creator
export const removeFromCart = (productId) => {
  return { type: cartActions.REMOVE_FROM_CART, prodId: productId };
};
