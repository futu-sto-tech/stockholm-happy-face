import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native'

import i18n from '../../lib/i18n'
import theme from '../../theme'
import FullscreenImage from '../../components/fullscreen-image'

const EntryScreen = ({ entry, onPressDelete, isDeleting }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <FullscreenImage uri={entry.gif.url} />
      <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
        {isDeleting ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.deleteButtonLabel}>
            {i18n.t('entry.deleteButton')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 4,
    marginTop: 8,
    height: 56,
    justifyContent: 'center',
  },
  deleteButtonLabel: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default EntryScreen
