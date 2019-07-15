import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native";

import theme from "../../theme";
import FullscreenImage from "../../components/fullscreen-image";

const ConfirmEntryScreen = ({ image, onPressSave, isSaving }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <FullscreenImage uri={image.original.url} />

      <TouchableOpacity style={styles.saveButton} onPress={onPressSave}>
        {isSaving ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: {
    padding: 8
  },
  image: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  saveButton: {
    backgroundColor: "rgb(0, 159, 119)",
    marginTop: 8,
    borderRadius: 4,
    height: 56,
    justifyContent: "center"
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center"
  }
});

export default ConfirmEntryScreen;
