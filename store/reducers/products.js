import PRODUCTS from '../../data/dummy-data';
import { productActions } from '../actions/products';
import Product from '../../models/product';

const initialState = {
  // availableProducts: [],
  // userProducts: [],
  // availableProducts: PRODUCTS,
  // userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productActions.FETCH_PRODUCTS:
      return {
        availableProducts: action.products,
        //userProducts: action.products.filter((prod) => prod.ownerId === 'u1'),
        userProducts: action.userProducts,
      };

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
    case productActions.CREATE_PRODUCT:
      const newProduct = new Product(
        //new Date().toString(),
        action.productData.id,
        //'u1',
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
        //availableProducts: [...state.availableProducts, newProduct],
        //userProducts: [...state.userProducts, newProduct],
      };
    case productActions.UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price //price is not updatable!
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const avProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[avProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };

    default:
      return state;
  }
};
