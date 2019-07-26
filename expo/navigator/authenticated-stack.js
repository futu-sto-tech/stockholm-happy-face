import { createStackNavigator } from 'react-navigation'

import i18n from '../lib/i18n'
import NewEntryContainer from '../screens/new-entry'
import ConfirmEntryContainer from '../screens/confirm-entry'
import { NEW_ENTRY_ROUTE, CONFIRM_ENTRY_ROUTE } from './routes'
import UserTabNavigator from './user-tab'

const AuthenticatedStackNavigator = createStackNavigator(
  {
    [NEW_ENTRY_ROUTE]: {
      screen: NewEntryContainer,
      navigationOptions: () => ({
        title: i18n.t('newEntry.navigation.title'),
        headerBackTitle: i18n.t('newEntry.navigation.backTitle'),
      }),
    },
    [CONFIRM_ENTRY_ROUTE]: {
      screen: ConfirmEntryContainer,
      navigationOptions: () => ({
        title: i18n.t('confirmEntry.navigation.title'),
      }),
    },
    TabNavigation: {
      screen: UserTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'TabNavigation',
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

export default AuthenticatedStackNavigator
