import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error.message, [{ text: 'okay' }]);
    }
  }, [error]);

  const dispatch = useDispatch();

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

  //THIS IS MIRACLE!
  //Define a function here (related to the data inside this page) and then using "useEffect" register this function to the route (add params of the route)
  //and then, this function accessible by the another screen/component (ShopNavigator) by using route.params['function']()
  const submitHandler = useCallback(async () => {
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

    setIsLoading(true);
    setError(null);

    try {
      if (editedProduct) {
        //dispatch(updateProduct(prodId, title, description, imageUrl));
        // console.log('prodId:', prodId);
        // console.log('title:', formState.inputValues.title);
        // console.log('description:', formState.inputValues.description);
        // console.log('imageUrl:', formState.inputValues.imageUrl);

        await dispatch(
          updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        // dispatch(createProduct(title, description, imageUrl, +price)); //to convert price to number!
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price //to convert price to number!
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

    // console.log('just before goback');
    // props.navigation.goBack();
    //}, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    //console.log('useEffect');
    props.navigation.setParams({ submit: submitHandler });
    //  }, [submitHandler]);
  }, [
    formState.inputValues.title,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    formState.inputValues.description,
  ]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: formActions.FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            validationErrorMessage="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            //onInputChange={() => inputChangeHandler('title')}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            validationErrorMessage="Please enter a valid image URL!"
            keyboardType="default"
            returnKeyType="next"
            //onInputChange={() => inputChangeHandler('imageUrl')}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />

          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              validationErrorMessage="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              //onInputChange={() => inputChangeHandler('price')}
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            validationErrorMessage="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            //onInputChange={() => inputChangeHandler('description')}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
