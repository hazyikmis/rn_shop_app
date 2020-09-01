import React from 'react';
import { Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import { addToCart } from '../../store/actions/cart';
import Colors from '../../constants/Colors';

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
          //onViewDetail={() => viewDetailHandler(itemData.item)}
          onSelect={() => viewDetailHandler(itemData.item)}
          //onAddToCart={addToCartHandler}
          //onAddToCart={() => addToCartHandler(itemData.item)}
        >
          <Button
            title="View Details"
            color={Colors.primaryColor}
            onPress={() => viewDetailHandler(itemData.item)}
          />
          <Button
            title="To Cart"
            color={Colors.primaryColor}
            //onPress={() => dispatch(addToCart(itemData.item))}  //this also works!
            onPress={() => addToCartHandler(itemData.item)}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;

//IN ORDER TO USE ProductItem component for different purposes, the template below hab been changed like above.
//With this change, we can now use different buttons with different functionalities (as props.children)
/*
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
*/
