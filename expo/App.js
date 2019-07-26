import React from 'react'
import { createAppContainer } from 'react-navigation'
import Constants from 'expo-constants'
import Sentry from 'sentry-expo'
import * as Amplitude from 'expo-analytics-amplitude'
import { Provider } from 'react-redux'

import store from './store'
import MainStackNavigator from './navigator/main-stack'

Sentry.config(Constants.manifest.extra.sentryDSN, {
  environment: Constants.manifest.extra.sentryEnvironment,
}).install()
Amplitude.initialize(Constants.manifest.extra.amplitudeApiKey)

const Navigation = createAppContainer(MainStackNavigator)

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
)

export default App
