import React from 'react'
import { AsyncStorage, View, TouchableOpacity, Text } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Constants from 'expo-constants'
import Sentry from 'sentry-expo'

import i18n from './lib/i18n'
import WelcomeScreen from './screens/welcome'
import ProfileScreen from './screens/profile'
import NewEntryScreen from './screens/new-entry'
import EntryScreen from './screens/entry'
import ConfirmEntryScreen from './screens/confirm-entry'
import AuthLoadingScreen from './screens/auth-loading'

Sentry.config(Constants.manifest.extra.sentryDSN).install()

const AuthenticatedNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('user', {}).name,
        headerBackTitle: 'Profile',
        headerRight: (
          <View style={{ marginRight: 16 }}>
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.removeItem('user')
                navigation.navigate('Welcome')
              }}
            >
              <Text
                style={{ color: 'rgba(255, 255, 255, 0.87)', fontSize: 16 }}
              >
                {i18n.t('profile.navigation.logoutButton')}
              </Text>
            </TouchableOpacity>
          </View>
        ),
      }),
    },
    Entry: {
      screen: EntryScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${i18n.t('entry.navigation.titlePrefix')} ${
          navigation.getParam('entry').week
        }`,
      }),
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: () => ({
        title: i18n.t('newEntry.navigation.title'),
        headerBackTitle: i18n.t('newEntry.navigation.backTitle'),
      }),
    },
    ConfirmEntry: {
      screen: ConfirmEntryScreen,
      navigationOptions: () => ({
        title: i18n.t('confirmEntry.navigation.title'),
      }),
    },
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      headerTitleStyle: {
        color: 'rgba(255, 255, 255, 0.87)',
        fontSize: 20,
      },
      headerTintColor: 'rgba(255, 255, 255, 0.6)',
    },
  }
)

const MainNavigator = createStackNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
    },
    Welcome: {
      screen: WelcomeScreen,
    },
    Authenticated: {
      screen: AuthenticatedNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
    mode: 'modal',
  }
)

const App = createAppContainer(MainNavigator)

export default App
