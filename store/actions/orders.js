export const orderActions = {
  ADD_ORDER: 'ADD_ORDER',
};

//addOrder action creator
export const addOrder = (cartItems, totalAmount) => {
  return {
    type: orderActions.ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
