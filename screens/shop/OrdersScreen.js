import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
  //const {} = props;
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);

  //no error handling here, it might stuck isLoading state always true!!!
  //if you might, you can add catch block!
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      //renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          //date={itemData.item.date}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
