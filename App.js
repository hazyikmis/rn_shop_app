import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
//import { ProductsNavigator as ShopNavigator } from './navigation/ShopNavigator';
// import ShopNavigator from './navigation/ShopNavigator';
import ShopNavigationContainer from './navigation/ShopNavigationContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import ReduxThunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

//import { composeWithDevTools } from 'redux-devtools-extension'; //for debugging, must be removed when production

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//const store = createStore(rootReducer, composeWithDevTools()); //for debugging!, must be replaced with the line above before production

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  // return (
  //   <Provider store={store}>
  //     <NavigationContainer>
  //       <ShopNavigator />
  //       {/* <ShopNavigationContainer /> DID NOT WORK! */}
  //     </NavigationContainer>
  //   </Provider>
  // );

  return (
    <Provider store={store}>
      <ShopNavigationContainer />
    </Provider>
  );
}
