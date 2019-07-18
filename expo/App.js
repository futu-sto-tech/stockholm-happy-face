import React from 'react'
import { Button, AsyncStorage } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import i18n from './lib/i18n'
import WelcomeScreen from './screens/welcome'
import ProfileScreen from './screens/profile'
import NewEntryScreen from './screens/new-entry'
import EntryScreen from './screens/entry'
import ConfirmEntryScreen from './screens/confirm-entry'
import AuthLoadingScreen from './screens/auth-loading'

const AuthenticatedNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('user', {}).name,
        headerBackTitle: 'Profile',
        headerRight: (
          <Button
            onPress={async () => {
              await AsyncStorage.removeItem('user')
              navigation.navigate('Welcome')
            }}
            title={i18n.t('profile.navigation.logoutButton')}
            color="rgba(255, 255, 255, 0.87)"
          />
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
      navigationOptions: {
        title: "How's your week?",
      },
    },
    ConfirmEntry: {
      screen: ConfirmEntryScreen,
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
