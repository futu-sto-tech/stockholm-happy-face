import React from 'react'
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'

import theme from '../../theme'

const AuthLoadingScreen = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <ActivityIndicator color={theme.global.colors.white} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
    justifyContent: 'center',
  },
})

export default AuthLoadingScreen
