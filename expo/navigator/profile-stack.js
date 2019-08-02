import React from 'react'
import { createStackNavigator } from 'react-navigation'

import i18n from '../lib/i18n'
import ProfileContainer from '../screens/profile'
import EntryContainer from '../screens/entry'
import ProfileHeaderRightContainer from '../screens/profile/header-right-container'
import { PROFILE_ROUTE, ENTRY_ROUTE } from './routes'
import defaultNavigationOptions from './default-navigation-options'

const ProfileStackNavigator = createStackNavigator(
  {
    [PROFILE_ROUTE]: {
      screen: ProfileContainer,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: i18n.t('profile.navigation.headerBackTitle'),
        headerRight: <ProfileHeaderRightContainer navigation={navigation} />,
      }),
    },
    [ENTRY_ROUTE]: {
      screen: EntryContainer,
      navigationOptions: ({ navigation }) => ({
        title: `${i18n.t('entry.navigation.titlePrefix')} ${
          navigation.getParam('entry').week
        }`,
      }),
    },
  },
  {
    initialRouteName: PROFILE_ROUTE,
    defaultNavigationOptions,
  }
)

export default ProfileStackNavigator
