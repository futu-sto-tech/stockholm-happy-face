import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'

import theme from '../theme'
import ArchiveContainer from '../screens/archive'
import { PROFILE_ROUTE, ARCHIVE_ROUTE } from './routes'
import defaultNavigationOptions from './default-navigation-options'
import ProfileStackNavigator from './profile-stack'

const UserTabNavigator = createBottomTabNavigator(
  {
    [PROFILE_ROUTE]: {
      screen: ProfileStackNavigator,
    },
    [ARCHIVE_ROUTE]: {
      screen: createStackNavigator(
        {
          [ARCHIVE_ROUTE]: {
            screen: ArchiveContainer,
            navigationOptions: { title: 'This week in GIFs' },
          },
        },
        {
          defaultNavigationOptions,
        }
      ),
    },
  },
  {
    initialRouteName: PROFILE_ROUTE,
    tabBarOptions: {
      activeTintColor: theme.global.colors.brand,
      inactiveTintColor: theme.global.colors.text.disabled,
      showLabel: false,
      style: {
        backgroundColor: '#202020',
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === PROFILE_ROUTE) {
          iconName = 'account-circle'
        } else if (routeName === ARCHIVE_ROUTE) {
          iconName = 'camera-roll'
        }

        return <MaterialIcons name={iconName} size={24} color={tintColor} />
      },
    }),
  }
)

export default UserTabNavigator
