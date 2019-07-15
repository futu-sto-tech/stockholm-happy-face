import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";

import theme from "../../theme";

const NewEntryScreen = ({ results, onPressResult }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
    <FlatList
      style={{ flex: 1, padding: 4 }}
      contentContainerStyle={styles.resultList}
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
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  resultList: {
    elevation: 4
  },
  resultListItem: {
    flex: 1
  },
  resultListImage: {
    height: (Dimensions.get("screen").width - 8 * 3) / 2,
    width: (Dimensions.get("screen").width - 8 * 3) / 2,
    margin: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  }
});

export default NewEntryScreen;
