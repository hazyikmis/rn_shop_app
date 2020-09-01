# Installations

- expo init rn_shop_app
- npm install redux react-redux
- npm install @react-navigation/native
- npm install react-navigation-header-buttons
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
- npm install @react-navigation/stack

> All stackNavigators should be connected with drawerNavigator. And this drawerNavigator needs to be exported as default
> Each first/default screen in stackNavigators should have a "headerLeft" menu icon for opening drawer menu

# Usage of UseSelector Hook (from react-redux npm library)

```
const data = useSelector(state => state.partOfState.subPartOfState)
const data = useSelector(state => state.partOfState.subPartOfState.find(...))
```

- partOfState: should be checked from generally App.js. In this app it could be one of the options (products, cart or orders), because in App.js:

```
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});
```

- subPartOfState: should be looked to reducer files and "initialState" definitions. For example, if partOfState: cart, then subPartOfState could be items or totalAmount, because, in /reducers/cart.js:

```
const initialState = {
  items: {},
  totalAmount: 0,
};
```

# Creating handler functions and registering them to "route" (by using useCallback & useEffect) and using them from navigation buttons (from other components)

> Here is the EditPage.js

```
  //THIS IS MIRACLE!
  //Define a function here (related to the data inside this page) and then using "useEffect" register this function to the route (add params of the route)
  //and then, this function accessible by the another screen/component (ShopNavigator) by using route.params['function']()

  const submitHandler = useCallback(() => {
    console.log('Submitting!');
    //YOU CAN DISPATCH A FUNCTION HERE (YOU CAN DO WHATEVER YOU WANT)
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
```

> Here is the MainNavigation.js (where the save button on the right top)

```
<StackAdmin.Screen
  name="EditProduct"
  component={EditProductScreen}
  options={({ navigation, route }) => ({
    headerTitle:
      route.params && route.params.productId
        ? 'Edit Product'
        : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={() => {
            route.params['submit'](); //VERY CRITICAL TACTIC!
          }}
        />
      </HeaderButtons>
    ),
  })}
/>
```
