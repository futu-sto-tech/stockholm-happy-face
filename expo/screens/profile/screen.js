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
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" />
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 32, marginBottom: 28 }} size="small" color="rgba(255, 255, 255, 0.87)" />
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
        style={{ marginHorizontal: -4 }}
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
      />
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: {
    overflow: 'scroll',
    padding: 8,
  },
  topContainer: {
    marginBottom: 4,
  },
  historyImageButton: {
    flex: 1,
  },
  historyImage: {
    height: (Dimensions.get('screen').width - 8 * 3) / 2,
    width: (Dimensions.get('screen').width - 8 * 3) / 2,
    margin: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
})

export default ProfileScreen
