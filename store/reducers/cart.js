import { cartActions } from '../actions/cart';
import CartItem from '../../models/cart';

const initialState = {
  //items: [], //keeping data as key-value pair (object) rather than array is better approach
  items: {}, //{id1: {quantity: 1, prodPrice: 29.99, prodTitle: "Red Shirt", sum: 29.99}, id2: {quantity: 3, prodPrice: 99.99, prodTitle: "Blue Carpet", sum: 299.97}, ...}
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    default:
      return state;
  }
};
