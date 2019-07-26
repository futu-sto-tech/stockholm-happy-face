import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import i18n from '../../lib/i18n'
import theme from '../../theme'

const ProfileHeaderRight = ({ onPressLogout }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressLogout}>
      <Text style={styles.label}>
        {i18n.t('profile.navigation.logoutButton')}
      </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginRight: theme.global.space.small,
  },
  label: {
    color: theme.global.colors.text.medium,
    fontSize: theme.global.font.size.regular,
  },
})

export default ProfileHeaderRight
