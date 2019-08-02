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
          {i18n.t('profile.currentEntry.weekLabel', { week })}
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
          <ActivityIndicator size="small" color={theme.global.colors.black} />
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
    marginTop: theme.global.space.xsmall,
    padding: theme.global.space.small,
    backgroundColor: theme.global.colors.elevation[3],
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekLabel: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
  },
  currentLabel: {
    color: theme.global.colors.text.medium,
    fontSize: theme.global.font.size.small,
  },
  deleteButton: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: theme.global.colors.status.critical,
    borderRadius: 4,
    paddingHorizontal: theme.global.space.small,
  },
  deleteButtonLabel: {
    color: theme.global.colors.black,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: theme.global.font.size.small,
  },
})

export default CurrentEntry
