import React, { useEffect, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';

const formActions = {
  FORM_INPUT_UPDATE: 'FORM_INPUT_UPDATE',
};

const formReducer = (state, action) => {
  if (action.type === formActions.FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      //...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state; //if another action happens
};

const EditProductScreen = (props) => {
  //const {} = props;
  //console.log(props); //props.route.params contains parameters (props) sent to this component
  //2 params (productId, productName) comes from UserProductsScreen

  //const prodId = props.route.params && props.route.params.productId;
  //the statement above is very clever way of escaping "undefined" errors
  //if props.route.params exist then assign the value of (right side) props.route.params.productId to prodId
  //otherwise assign to prodId the value of (left side) props.route.params, which is probably "undefined"
  //If prodId is undefined then the result of the code just below is also undefined: editedProduct is undefined
  const prodId = props.route.params?.productId;
  //the statement above is MORE clever way of escaping "undefined" errors

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  //const [state, dispatch] = useReducer(reducer, initialState, init)
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      //setTitleIsValid(false);
      isValid: true;
    }
    //setTitle(text);
    dispatchFormState({
      type: formActions.FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      //input: 'title', //or 'imageUrl' or 'description'
      input: inputIdentifier,
    });
  };

  //THIS IS MIRACLE!
  //Define a function here (related to the data inside this page) and then using "useEffect" register this function to the route (add params of the route)
  //and then, this function accessible by the another screen/component (ShopNavigator) by using route.params['function']()
  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    //console.log('Submitting!');
    //YOU CAN DISPATCH A FUNCTION HERE (YOU CAN DO WHATEVER YOU WANT)
    // if (!titleIsValid) {
    //if (!formState.inputValidities.title) {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (editedProduct) {
      //dispatch(updateProduct(prodId, title, description, imageUrl));
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      // dispatch(createProduct(title, description, imageUrl, +price)); //to convert price to number!
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price //to convert price to number!
        )
      );
    }
    props.navigation.goBack();
    //}, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            //value={title}
            value={formState.inputValues.title}
            //onChangeText={(text) => setTitle(text)}
            //onChangeText={(text) => titleChangeHandler(text)}
            onChangeText={() => textChangeHandler('title')}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            // onEndEditing={(event) => {
            //   console.log(event.nativeEvent.text);
            // }}
            //onSubmitEditing={(event) => console.log(event)}
          />
        </View>
        {/* {!titleIsValid && <Text>Please enter a valid title!</Text>} */}
        {!formState.inputValidities.title && (
          <Text>Please enter a valid title!</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            //value={imageUrl}
            value={formState.inputValues.imageUrl}
            //onChangeText={(text) => setImageUrl(text)}
            onChangeText={() => textChangeHandler('imageUrl')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              //value={price}
              value={formState.inputValues.price}
              //onChangeText={(text) => setPrice(text)}
              onChangeText={() => textChangeHandler('price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            //value={description}
            value={formState.inputValues.description}
            //onChangeText={(text) => setDescription(text)}
            onChangeText={() => textChangeHandler('description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
