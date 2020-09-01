import PRODUCTS from '../../data/dummy-data';
import { productActions } from '../actions/products';

const initialState = {
  // availableProducts: [],
  // userProducts: [],
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productActions.DELETE_PRODUCT:
      //delete from both "availableProducts" & "userProducts"
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pId
        ),
      };
    default:
      return state;
  }
};
