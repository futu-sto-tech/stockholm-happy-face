import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import theme from '../../theme'

const NewEntryScreen = ({ results, onPressResult }) => (
  <FlatList
    style={styles.resultList}
    contentContainerStyle={styles.resultListContentContainer}
    numColumns={2}
    data={results}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.resultListItem}
        onPress={() => onPressResult(item)}
      >
        <Image
          resizeMode="cover"
          style={styles.resultListImage}
          source={{ uri: item.preview.url }}
        />
      </TouchableOpacity>
    )}
    ListFooterComponent={<SafeAreaView />}
  />
)

const styles = StyleSheet.create({
  resultList: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
    paddingHorizontal: theme.global.space.xsmall / 2,
  },
  resultListContentContainer: {
    marginTop: theme.global.space.xsmall / 2,
  },
  resultListItem: {
    flex: 1,
  },
  resultListImage: {
    height:
      (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
    width: (Dimensions.get('screen').width - theme.global.space.xsmall * 3) / 2,
    margin: theme.global.space.xsmall / 2,
    borderRadius: 4,
    backgroundColor: theme.global.colors.elevation[1],
  },
})

export default NewEntryScreen
