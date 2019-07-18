import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import i18n from '../../lib/i18n'
import theme from '../../theme'
import FullscreenImage from '../../components/fullscreen-image'

const CurrentEntry = ({ gif, week, onPressDelete, isDeleting }) => (
  <>
    <FullscreenImage uri={gif.url} />
    <View style={styles.surface}>
      <View>
        <Text style={styles.weekLabel}>
          {i18n.t('profile.currentEntry.weekLabel')} {week}
        </Text>
        <Text style={styles.currentLabel}>
          {i18n.t('profile.currentEntry.currentLabel')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onPressDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.deleteButtonLabel}>
            {i18n.t('profile.currentEntry.deleteButton')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </>
)

const styles = StyleSheet.create({
  surface: {
    marginTop: 8,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekLabel: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: 20,
    fontWeight: '500',
  },
  currentLabel: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 4,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  deleteButtonLabel: {
    color: '#000',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 16,
  },
})

export default CurrentEntry
