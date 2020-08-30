import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const defaultStackNavScreenOptions = {
  headerStyle: {
    //height: 80,
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  //headerTransparent: true,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans', //no effect on android (no "back" text, just icon)
  },
};

const StackProd = createStackNavigator();

const ProductsNavigator = (navProps) => {
  //console.log(navProps); //empty object!!!
  return (
    <StackProd.Navigator screenOptions={defaultStackNavScreenOptions}>
      <StackProd.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          headerTitle: 'All Products',
        }}
      />
      <StackProd.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        //options={{ headerTitle: '...' }}
        options={({ route }) => ({ headerTitle: route.params.product.title })}
      />
    </StackProd.Navigator>
  );
};

export default ProductsNavigator;
