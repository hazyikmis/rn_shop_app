import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  //const {} = props;
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem product={itemData.item} onSelect={() => {}}>
          <Button title="Edit" color={Colors.primaryColor} onPress={() => {}} />
          <Button
            title="Delete"
            color={Colors.primaryColor}
            onPress={() => {}}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

/*
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
*/
