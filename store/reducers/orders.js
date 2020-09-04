import { orderActions } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case orderActions.ADD_ORDER:
      const newOrder = new Order(
        //new Date().toString(),  //previously used as id
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        //new Date()
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

//The concat() method is used to merge two or more arrays.
//This method does not change the existing arrays, but instead returns a new array.
