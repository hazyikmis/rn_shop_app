import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import { addToCart } from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
  //const {} = props;
  //console.log(props);  //props contains navigation & route objects

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetailHandler = (product) => {
    //console.log('view detail');
    props.navigation.navigate({
      name: 'ProductDetail',
      params: { productId: product.id, product }, //product: product
      //its ridiculous I know! sending "product.productId" & complete "product" together
    });
  };

  const addToCartHandler = (product) => {
    //console.log('add to cart');
    dispatch(addToCart(product));
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          //onViewDetail={viewDetailHandler}
          onViewDetail={() => viewDetailHandler(itemData.item)}
          //onAddToCart={addToCartHandler}
          onAddToCart={() => addToCartHandler(itemData.item)}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
