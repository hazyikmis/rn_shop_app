import Order from '../../models/order';

export const orderActions = {
  ADD_ORDER: 'ADD_ORDER',
  FETCH_ORDERS: 'FETCH_ORDERS',
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-shop-app-5b06a.firebaseio.com/orders/u1.json/'
      );
      //DEFAULT fetch statement is GET type and no need to send headers & body

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      //fetched data is like {{key: value}, {key: value}, ...} //keys are string and values are also object
      //so we need to convert it array of objects
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      //console.log(resData);
      dispatch({ type: orderActions.FETCH_ORDERS, orders: loadedOrders });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
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
