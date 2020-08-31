import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = (props) => {
  //const {} = props;
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
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accentColor}
          title="Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            item={itemData.item}
            onRemove={() => {
              console.log('remove');
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
