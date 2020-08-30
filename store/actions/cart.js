export const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
};

export const addToCart = (product) => {
  return { type: cartActions.ADD_TO_CART, product };
};
