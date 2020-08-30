import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = (props) => {
  //props : navigation & route
  //console.log('ProductDetailScreen-props', props);
  //const { product } = props.route.params;
  const { productId, product } = props.route.params;
  //actually we have all product object, no need to query again from store, but ...
  //selectedProduct below is props.product
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          color={Colors.primaryColor}
          title="Add to Cart"
          onPress={() => {}}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
});

export default ProductDetailScreen;

/*
return (
  <View style={styles.container}>
    <Text>Product Detail Screen</Text>
    <Text>{product.title}</Text>
    <Text>{selectedProduct.title}</Text>
  </View>
);
*/
