import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './ShopNavigator';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
//import ShopNavigator from './ShopNavigator';

const ShopNavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isDidTryAutoLogin = useSelector((state) => state.auth.didTryAL);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && isDidTryAutoLogin && <AuthScreen />}
      {!isAuth && !isDidTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default ShopNavigationContainer;
