import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch } from 'react-redux';
import { signUp, login } from '../../store/actions/auth';

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

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false); //initially SignIn mode
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  //this useEffect added only for showing error!
  useEffect(() => {
    if (error) {
      Alert.alert('An Error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  //const signUpHandler = () => {  //name changed because this button used for 2 purposes login & signup
  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      //props.navigation.navigate('ProductsOverview');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    //setIsLoading(false); //no need here, because if login is successful then we are navigating another screen

    // if (error) {
    //   Alert.alert('An Error occurred!', error, [{ text: 'Okay' }]);
    // }
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <LinearGradient colors={['#ffcbff', '#ffeeff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required //for validation
              email //for validation
              autoCapitalize="none"
              validationErrorMessage="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required //for validation
              minLength={5} //for validation
              autoCapitalize="none"
              validationErrorMessage="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    //height: '50%',
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
