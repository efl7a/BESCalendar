import React from 'react';
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import firebase from 'firebase';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';

import MainNavigator from './navigation/MainNavigator';
import registerForNotifications from './services/push_notifications';
import store from './store';

export default class App extends React.Component {
  async componentWillMount() {
    const config = {
        apiKey: FIREBASE_API_KEY,
        authDomain: 'bescalendar-4c9ae.firebaseapp.com',
        databaseURL: 'https://bescalendar-4c9ae.firebaseio.com',
        projectId: 'bescalendar-4c9ae',
        storageBucket: 'bescalendar-4c9ae.appspot.com',
        messagingSenderId: '396684695034'
      };
    await firebase.initializeApp(config);
  }

  componentDidMount() {
    registerForNotifications();

      Notifications.addListener((notification) => {
        const { data: { text }, origin } = notification

        if (origin === "received" && text) {
          Alert.alert(
            'New Push Notification',
            text,
            [{ text: 'OK'}]
          );
        }
      });
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
