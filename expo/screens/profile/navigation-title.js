import React from 'react'
import { useSelector } from 'react-redux'
import { Text, StyleSheet } from 'react-native'

import theme from '../../theme'

const ProfileNavigationTitle = () => {
  const user = useSelector(state => state.userData.value)
  return <Text style={styles.title}>{user && user.name}</Text>
}

const styles = StyleSheet.create({
  title: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.medium,
    fontWeight: 'bold',
  },
})

export default ProfileNavigationTitle
