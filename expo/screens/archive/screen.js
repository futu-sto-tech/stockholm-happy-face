import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'

import theme from '../../theme'
import FullscreenImage from '../../components/fullscreen-image'

const ArchiveScreen = ({ entries }) => (
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
      <Text style={styles.listEmptyText}>
        Be the first to submit an entry this week!
      </Text>
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
  listEmptyText: {
    color: theme.global.colors.text.medium,
    textAlign: 'center',
    fontSize: theme.global.font.size.regular,
    marginTop: theme.global.space.medium,
  },
})

export default ArchiveScreen
