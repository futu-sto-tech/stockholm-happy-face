import { createStackNavigator } from 'react-navigation'

import i18n from '../lib/i18n'
import NewEntryContainer from '../screens/new-entry'
import ConfirmEntryContainer from '../screens/confirm-entry'
import { NEW_ENTRY_ROUTE, CONFIRM_ENTRY_ROUTE } from './routes'

const NewEntryStackNavigator = createStackNavigator(
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
  },
  {
    initialRouteName: NEW_ENTRY_ROUTE,
  }
)

export default NewEntryStackNavigator
