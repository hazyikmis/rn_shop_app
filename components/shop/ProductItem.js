import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const ProductItem = (props) => {
  //const {} = props;

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: props.product.imageUrl }}
                style={styles.image}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.product.title}</Text>
              <Text style={styles.price}>
                ${props.product.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  //image overlaps the rounded corners of the outer view: product, we used this view because of that
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});

export default ProductItem;

/*
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: props.product.imageUrl }}
                style={styles.image}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.product.title}</Text>
              <Text style={styles.price}>
                ${props.product.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button
                title="View Details"
                color={Colors.primaryColor}
                onPress={props.onViewDetail}
              />
              <Button
                title="To Cart"
                color={Colors.primaryColor}
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
*/
