import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native'

import theme from '../../theme'
import FullscreenImage from '../../components/fullscreen-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import i18n from '../../lib/i18n'

const ArchiveScreen = ({ entries, hasLoaded, onPressNewEntry }) => (
  <FlatList
    style={styles.container}
    data={entries}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <>
        <View style={styles.userLabelContainer}>
          <Text style={styles.userLabel}>{item.user.name}</Text>
        </View>
        <FullscreenImage uri={item.gif.url} />
      </>
    )}
    ListEmptyComponent={() => (
      <View style={styles.listEmptyContainer}>
        {hasLoaded ? (
          <View>
            <Text style={styles.listEmptyText}>
              {i18n.t('archive.submitEntry.message')}
            </Text>
            <TouchableOpacity
              style={styles.newEntryButton}
              onPress={onPressNewEntry}
            >
              <Text style={styles.newEntryButtonLabel}>
                {i18n.t('archive.submitEntry.button')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator color={theme.global.colors.white} />
        )}
      </View>
    )}
    ItemSeparatorComponent={() => (
      <View style={{ height: theme.global.space.xsmall }} />
    )}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
    padding: theme.global.space.xsmall,
  },
  userLabelContainer: {
    backgroundColor: theme.global.colors.elevation[2],
    borderRadius: 4,
    paddingVertical: theme.global.space.xsmall,
    marginBottom: theme.global.space.xsmall,
  },
  userLabel: {
    color: theme.global.colors.text.high,
    textAlign: 'center',
    fontSize: theme.global.font.size.medium,
  },
  listEmptyContainer: {
    marginTop: theme.global.space.medium,
  },
  listEmptyText: {
    color: theme.global.colors.text.medium,
    textAlign: 'center',
    fontSize: theme.global.font.size.regular,
  },
  newEntryButton: {
    marginTop: theme.global.space.small,
    backgroundColor: theme.global.colors.brand,
    borderRadius: 4,
    height: 56,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: theme.global.space.large,
  },
  newEntryButtonLabel: {
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default ArchiveScreen
