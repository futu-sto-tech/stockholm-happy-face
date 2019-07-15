import React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";

const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.label}>What's your name?</Text>
      <TextInput style={styles.input} value="Robin" />
      <Button
        color="#fff"
        title="Continue"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcd4e1"
  },
  label: {
    color: "#200a74"
  },
  input: {
    color: "#fff"
  }
});

export default LoginScreen;
