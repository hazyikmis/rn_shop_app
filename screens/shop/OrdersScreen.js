import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
  //const {} = props;
  const orders = useSelector((state) => state.orders.orders);
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

export default OrdersScreen;
