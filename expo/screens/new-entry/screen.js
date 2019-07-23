import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
  ActivityIndicator,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import theme from '../../theme'

const NewEntryScreen = ({
  results,
  onPressResult,
  onLoadMore,
  loadingMore,
}) => (
  <FlatList
    style={styles.resultList}
    contentContainerStyle={styles.resultListContentContainer}
    numColumns={2}
    data={results}
    keyExtractor={item => item.id}
    keyboardDismissMode="on-drag"
    refreshing={loadingMore}
    ListEmptyComponent={() => (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <MaterialIcons
            name="arrow-upward"
            size={24}
            color={theme.global.colors.text.medium}
          />
        </View>
        <Text style={styles.emptyText}>Search for a GIF</Text>
      </View>
    )}
    ItemSeparatorComponent={() => (
      <View style={{ height: theme.global.space.xsmall }} />
    )}
    columnWrapperStyle={{
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
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
    ListFooterComponent={
      <SafeAreaView>
        {results.length > 0 && (
          <TouchableOpacity onPress={onLoadMore} style={styles.loadMoreButton}>
            {loadingMore ? (
              <ActivityIndicator
                size="small"
                color={theme.global.colors.black}
              />
            ) : (
              <Text style={styles.loadMoreButtonText}>Load more</Text>
            )}
          </TouchableOpacity>
        )}
      </SafeAreaView>
    }
  />
)

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingTop: theme.global.space.small,
  },
  emptyText: {
    marginTop: theme.global.space.xsmall,
    color: theme.global.colors.text.medium,
    fontSize: theme.global.font.size.small,
  },
  resultList: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
  },
  resultListContentContainer: {
    paddingHorizontal: theme.global.space.xxsmall,
    marginTop: theme.global.space.xsmall,
  },
  resultListItem: {
    height:
      (Dimensions.get('screen').width - theme.global.space.xsmall * 2) / 2,
    width: (Dimensions.get('screen').width - theme.global.space.xsmall * 2) / 2,
  },
  resultListImage: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: theme.global.colors.elevation[1],
  },
  loadMoreButton: {
    backgroundColor: theme.global.colors.status.unknown,
    borderRadius: 4,
    height: theme.global.size.xxsmall,
    justifyContent: 'center',
    marginVertical: theme.global.space.xsmall,
  },
  loadMoreButtonText: {
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default NewEntryScreen
