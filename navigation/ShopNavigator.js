import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';

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

const drawerMenu = (navigation) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName="ios-menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

//PRODUCTS NAVIGATOR STACK
const StackProd = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <StackProd.Navigator screenOptions={defaultStackNavScreenOptions}>
      <StackProd.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        //options={{ headerTitle: 'All Products' }}
        options={({ route, navigation }) => ({
          headerTitle: 'All Products',
          headerLeft: () => drawerMenu(navigation),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                //the event onPress below should takes us to the "CartScreen.js"
                //2 things required: 1.CartScreen should be registered to the navigator
                //onPress={() => console.log('Cart pressed')}
                onPress={() => navigation.navigate('Cart')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <StackProd.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        //options={{ headerTitle: '...' }}
        options={({ route }) => ({ headerTitle: route.params.product.title })}
      />
      <StackProd.Screen
        name="Cart"
        component={CartScreen}
        options={({ route }) => ({ headerTitle: 'Your Cart' })}
      />
    </StackProd.Navigator>
  );
};

//ORDERS NAVIGATOR STACK
const StackOrders = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <StackOrders.Navigator screenOptions={defaultStackNavScreenOptions}>
      <StackOrders.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Your Orders',
          headerLeft: () => drawerMenu(navigation),
        })}
      />
    </StackOrders.Navigator>
  );
};

//ADMIN NAVIGATOR STACK
const StackAdmin = createStackNavigator();

const AdminNavigator = () => {
  return (
    <StackAdmin.Navigator screenOptions={defaultStackNavScreenOptions}>
      <StackAdmin.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Your Products',
          headerLeft: () => drawerMenu(navigation),
        })}
      />
    </StackAdmin.Navigator>
  );
};

//DRAWER MENU (MAIN MENU)
const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        labelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerLabel: 'All Products',
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerLabel: 'Your Orders',
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerLabel: 'Admin',
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

//export default ProductsNavigator;
export default ShopNavigator;