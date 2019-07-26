import { createStackNavigator } from 'react-navigation'

import AuthLoadingContainer from '../screens/auth-loading'
import WelcomeContainer from '../screens/welcome'
import {
  AUTH_LOADING_ROUTE,
  WELCOME_ROUTE,
  NEW_ENTRY_ROUTE,
  AUTHENTICATED_ROUTE,
} from './routes'
import NewEntryStackNavigator from './new-entry-stack'
import AuthenticatedStackNavigator from './authenticated-stack'

const MainStackNavigator = createStackNavigator(
  {
    [AUTH_LOADING_ROUTE]: {
      screen: AuthLoadingContainer,
    },
    [WELCOME_ROUTE]: {
      screen: WelcomeContainer,
    },
    [NEW_ENTRY_ROUTE]: {
      screen: NewEntryStackNavigator,
    },
    [AUTHENTICATED_ROUTE]: {
      screen: AuthenticatedStackNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: AUTH_LOADING_ROUTE,
    headerMode: 'none',
    mode: 'modal',
  }
)

export default MainStackNavigator
