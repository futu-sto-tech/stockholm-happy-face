import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import i18n from '../../lib/i18n'

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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    paddingHorizontal: 24,
    height: 160,
    justifyContent: 'center',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    marginTop: 16,
    padding: 8,
    borderRadius: 4,
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.38)',
    fontSize: 20,
  },
})

export default EntryForm
