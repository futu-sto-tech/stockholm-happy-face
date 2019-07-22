import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import backend from './backend'

const registerForPushNotificationsAsync = async user => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // Only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()

  return await backend.updateUser(user, { expoPushToken: token })
}

export const login = async username => {
  let user = await backend.getUser(username)

  if (!user) {
    user = await backend.createUser(username)
  }

  if (user) {
    await AsyncStorage.setItem('user', user.name)
    return (await registerForPushNotificationsAsync(user)) || user
  }

  return null
}
