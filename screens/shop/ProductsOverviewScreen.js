import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  //const {} = props;
  //console.log(props);  //props contains navigation & route objects

  const viewDetailHandler = (product) => {
    //console.log('view detail');
    props.navigation.navigate({
      name: 'ProductDetail',
      params: { productId: product.id, product }, //product: product
      //its ridiculous I know! sending "product.productId" & complete "product" together
    });
  };

  const addToCartHandler = () => {
    console.log('add to cart');
  };

  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          //onViewDetail={viewDetailHandler}
          onViewDetail={() => viewDetailHandler(itemData.item)}
          onAddToCart={addToCartHandler}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
