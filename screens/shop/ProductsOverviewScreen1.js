import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import { addToCart } from '../../store/actions/cart';
import Colors from '../../constants/Colors';

import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = (props) => {
  //const {} = props;
  //console.log(props);  //props contains navigation & route objects

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  //useEffect below just works only once (hopefully) when the page loads!
  useEffect(() => {
    // console.log('useEffect: fetchProducts');
    const loadProducts = async () => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button
          title="Try Again"
          onPress={() => {
            props.navigation.navigate({ name: 'ProductsOverview' });
          }}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found!. Maybe start adding some...</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

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
