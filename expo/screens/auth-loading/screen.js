import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import theme from '../../theme'

const AuthLoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color={theme.global.colors.black} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.global.colors.status.ok,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AuthLoadingScreen
