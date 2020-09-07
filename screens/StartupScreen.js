import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Colors from '../constants/Colors';

import { useDispatch } from 'react-redux';
import * as authActs from '../store/actions/auth';

const StartupScreen = (props) => {
  //const {} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      //props.navigation.navigate('ProductsNavigator');
      props.navigation.navigate('ProductsOverview');
      //dispatch(authActs.authenticate(userId, token));
      const expirationTime = expirationDate.getTime() - new Date().getTime(); //future - now
      dispatch(authActs.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
