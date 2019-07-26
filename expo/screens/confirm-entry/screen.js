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

const ConfirmEntryScreen = ({ image, onPressSave, saving }) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: theme.global.colors.background }}
  >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FullscreenImage uri={image.original.url} />

        <TouchableOpacity style={styles.saveButton} onPress={onPressSave}>
          {saving ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text style={styles.saveButtonText}>
              {i18n.t('confirmEntry.saveButton')}
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
  image: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: theme.global.colors.elevation[1],
  },
  saveButton: {
    backgroundColor: theme.global.colors.status.ok,
    marginTop: theme.global.space.xsmall,
    borderRadius: 4,
    height: theme.global.size.xxsmall,
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default ConfirmEntryScreen
