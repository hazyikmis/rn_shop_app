import React from 'react';
import { FlatList, Button, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = (props) => {
  //const {} = props;
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id, title) => {
    props.navigation.navigate({
      name: 'EditProduct',
      params: {
        productId: id,
        productName: title,
      },
    });
  };

  const deleteProductHandler = (id) => {
    //dispatch(deleteProduct(id));
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found! Maybe start adding new products...?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            editProductHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="Edit"
            color={Colors.primaryColor}
            onPress={() => {
              // props.navigation.navigate({
              //   name: 'EditProduct',
              //   params: {
              //     productId: itemData.item.id,
              //     productName: itemData.item.title,
              //   },
              // });
              editProductHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            title="Delete"
            color={Colors.primaryColor}
            onPress={() => {
              //dispatch(deleteProduct(itemData.item.id));
              deleteProductHandler(itemData.item.id);
            }}
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
