import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native'

import theme from '../../theme'
import i18n from '../../lib/i18n'
import EntryForm from './entry-form'
import CurrentEntry from './current-entry'

const ProfileScreen = ({
  currentEntry,
  entries,
  onPressInput,
  onPressEntry,
  onPressDeleteCurrentEntry,
  isDeleting,
}) => (
  <ScrollView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.topContainer}>
      {currentEntry ? (
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
      contentContainerStyle={{ paddingBottom: theme.global.space.xsmall }}
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
      columnWrapperStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: theme.global.space.xsmall }} />
      )}
      ListHeaderComponent={() => (
        <Text style={styles.prevHeading}>
          {i18n.t('profile.prevWeeksHeading')}
        </Text>
      )}
    />
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: theme.global.colors.background,
    paddingHorizontal: theme.global.space.xsmall,
  },
  topContainer: {
    paddingTop: theme.global.space.xsmall,
  },
  prevHeading: {
    fontSize: theme.global.font.size.medium,
    color: theme.global.colors.text.medium,
    marginBottom: theme.global.space.small,
    fontWeight: '500',
    textAlign: 'center',
  },
  historyList: {
    marginTop: theme.global.space.large,
  },
  historyImageButton: {
    height:
      (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
    width: (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
  },
  historyImage: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: theme.global.colors.elevation[1],
  },
})

export default ProfileScreen
