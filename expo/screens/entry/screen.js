import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import i18n from '../../lib/i18n'
import theme from '../../theme'
import FullscreenImage from '../../components/fullscreen-image'

const EntryScreen = ({ entry, onPressDelete, deleting }) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: theme.global.colors.background }}
  >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FullscreenImage uri={entry.gif.url} />
        <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          {deleting ? (
            <ActivityIndicator size="small" color={theme.global.colors.black} />
          ) : (
            <Text style={styles.deleteButtonLabel}>
              {i18n.t('entry.deleteButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ScrollView>
)

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    padding: theme.global.space.xsmall,
  },
  deleteButton: {
    backgroundColor: theme.global.colors.status.critical,
    borderRadius: 4,
    marginTop: theme.global.space.xsmall,
    height: theme.global.size.xxsmall,
    justifyContent: 'center',
  },
  deleteButtonLabel: {
    color: theme.global.colors.black,
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default EntryScreen
