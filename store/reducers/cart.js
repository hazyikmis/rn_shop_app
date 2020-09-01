import { cartActions } from '../actions/cart';
import { orderActions } from '../actions/orders';
import CartItem from '../../models/cart';
import { productActions } from '../actions/products';

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
    case cartActions.REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.prodId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        //needs to be reduced the amount
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.prodId]: updatedCartItem };
      } else {
        //needs to be deleted from cart
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.prodId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case orderActions.ADD_ORDER:
      //normally this action handled in the orders reducer, but in order to make changes on cart (to empty it) we are also handling here
      return initialState;
    case productActions.DELETE_PRODUCT:
      //we need to make sure the product must be deleted from cart if its deleted (??? BAD DESIGN DECISION!)
      //not reduced by one, must be totally erased!
      if (!state.items[action.pId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pId].sum; //deleted item's total amount (price)
      delete updatedItems[action.pId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
