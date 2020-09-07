//this container used only for auto-logout
//when auth data (token & userId) in redux store set to null then instantly app should navigate to login screen
//The only place we can do is App.js. But in App.js we can not check the store
//Because of that rather than checking inside ShopNavigator we have created this container and put
//ShopNavigator here. And in order to access the store we used useSelector hook!
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import ShopNavigator from './ShopNavigator';
//import ShopNavigator from './ShopNavigator';

const ShopNavigationContainer = (props) => {
  //when state.auth.token set to null, (redux store/state changes) then we need to logout
  //only token is null or not check is enough for this operation (no need to check expiration time)
  const navRef = useRef();

  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      //we need to navigate login page. PROBLEM: How we can access the "navigation" object of "ShopNavigator" => SOLUTION: useRef
      //SIDE NOTE:Only components created by ShopNavigator can access the props.navigation,
      //but this component is wrapper of it, not child of it!
      //useRef helps us to solve this problem
      console.log(navRef);
      navRef.current.dispatch(CommonActions.navigate({ route: 'Auth' }));
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default ShopNavigationContainer;
