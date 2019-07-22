import React from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

import theme from '../../theme'
import EntryForm from './entry-form'
import CurrentEntry from './current-entry'

const ProfileScreen = ({
  currentEntry,
  entries,
  onPressInput,
  onPressEntry,
  onPressDeleteCurrentEntry,
  isDeleting,
  loading,
}) => (
  <ScrollView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.topContainer}>
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="small"
          color={theme.global.colors.white}
        />
      ) : currentEntry ? (
        <CurrentEntry
          {...currentEntry}
          onPressDelete={onPressDeleteCurrentEntry}
          isDeleting={isDeleting}
        />
      ) : (
        <EntryForm onPress={onPressInput} />
      )}
    </View>

    <FlatList
      style={styles.historyList}
      numColumns={2}
      data={entries.map(entry => ({ key: entry.id, ...entry }))}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.historyImageButton}
          onPress={() => onPressEntry(item)}
        >
          <Image
            resizeMode="cover"
            style={styles.historyImage}
            source={{ uri: item.gif.url }}
          />
        </TouchableOpacity>
      )}
      ListFooterComponent={<SafeAreaView />}
    />
  </ScrollView>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    overflow: 'scroll',
    backgroundColor: theme.global.colors.background,
  },
  topContainer: {
    marginTop: theme.global.space.xsmall,
    paddingHorizontal: theme.global.space.xsmall,
    marginBottom: theme.global.space.xsmall,
  },
  loadingIndicator: {
    marginTop: theme.global.space.medium,
    marginBottom: theme.global.space.medium - theme.global.space.xsmall,
  },
  historyList: {
    marginTop: -theme.global.space.xsmall / 2,
    paddingHorizontal: theme.global.space.xsmall / 2,
  },
  historyImageButton: {
    flex: 1,
  },
  historyImage: {
    height:
      (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
    width: (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
    margin: theme.global.space.xsmall / 2,
    borderRadius: 4,
    backgroundColor: theme.global.colors.elevation[1],
  },
})

export default ProfileScreen
