import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
  //const {} = props;

  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  //const cartItems = useSelector(state => state.cart.items);
  const cartItems = useSelector((state) => {
    const transformedCartItems = []; //transformed from object to array
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        // productTitle: state.cart.items[key].productTitle,
        // productPrice: state.cart.items[key].productPrice,
        // quantity: state.cart.items[key].quantity,
        // sum: state.cart.items[key].sum,
        ...state.cart.items[key],
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          {/* <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text> */}
          {/* multiply by 100 and then divide by 100 to prevent -0.00 to see on the screen! */}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>

        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        ) : (
          <Button
            color={Colors.accentColor}
            title="Order Now"
            disabled={cartItems.length === 0}
            //onPress={() => dispatch(addOrder(cartItems, cartTotalAmount))}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            item={itemData.item}
            deletable
            onRemove={() => {
              //console.log('remove');
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    // NO NEED THE COMMENTED LINES BELOW, BECAUSE ALL EXIST IN "Card"
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 5,
    // borderRadius: 10,
    // backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primaryColor,
  },
});

export default CartScreen;
