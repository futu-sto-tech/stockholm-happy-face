import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import i18n from '../../lib/i18n'
import theme from '../../theme'

const EntryForm = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{i18n.t('profile.entryForm.title')}</Text>
    <TouchableOpacity style={styles.input} onPress={onPress}>
      <Text style={styles.placeholder}>
        {i18n.t('profile.entryForm.placeholder')}
      </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.global.colors.elevation[2],
    borderRadius: 4,
    paddingHorizontal: theme.global.space.medium,
    paddingVertical: theme.global.space.large,
  },
  label: {
    color: theme.global.colors.text.high,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.global.colors.elevation[3],
    marginTop: theme.global.space.small,
    padding: theme.global.space.small,
    borderRadius: 4,
  },
  placeholder: {
    color: theme.global.colors.placeholder,
    fontSize: 20,
  },
})

export default EntryForm
