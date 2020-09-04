export const orderActions = {
  ADD_ORDER: 'ADD_ORDER',
  FETCH_ORDERS: 'FETCH_ORDERS',
};

//addOrder action creator
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      //be careful: we are not storing orders directly under "orders"
      //we have sub folders (sub collections or sub objects) for each user!
      'https://rn-shop-app-5b06a.firebaseio.com/orders/u1.json/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: orderActions.ADD_ORDER,
      //orderData: { items: cartItems, amount: totalAmount },
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
