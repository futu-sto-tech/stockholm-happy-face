import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'

import i18n from '../../lib/i18n'
import theme from '../../theme'

const WelcomeScreen = ({
  onPressLogin,
  loading,
  backdropUrl,
  username,
  onChangeUsername,
  isMatchingUser,
}) => (
  <>
    <View style={styles.gifContainer}>
      <Image
        style={styles.gifImage}
        source={{ uri: backdropUrl }}
        resizeMode="cover"
      />
    </View>
    <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} />
    <View style={styles.cover} />
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo/logo.png')} />
            <Text style={styles.logoText}>Smileys</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.usernameInputContainer}>
              <TextInput
                style={styles.usernameInput}
                placeholder={i18n.t('welcome.input.placeholder')}
                placeholderTextColor={theme.global.colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="go"
                onSubmitEditing={onPressLogin}
                onChangeText={onChangeUsername}
                value={username}
              />

              <View style={styles.usernameInputIndicatorContainer}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.global.colors.white}
                  />
                ) : (
                  username.length > 0 && (
                    <MaterialIcons
                      name={isMatchingUser ? 'check' : 'add'}
                      size={24}
                      color={
                        isMatchingUser
                          ? theme.global.colors.status.ok
                          : theme.global.colors.text.high
                      }
                    />
                  )
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
  },
  cover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.global.colors.black,
    opacity: 0.5,
  },
  gifContainer: { ...StyleSheet.absoluteFill },
  gifImage: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 60,
    color: theme.global.colors.text.high,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: theme.global.space.small,
    textShadowColor: theme.global.colors.black,
    textShadowRadius: 3,
    textShadowOffset: { height: 0, width: 0 },
  },
  footer: {
    marginHorizontal: theme.global.space.small,
    marginBottom: theme.global.space.small,
    backgroundColor: theme.global.colors.background,
    borderRadius: 4,
  },
  usernameInputContainer: {
    backgroundColor: theme.global.colors.elevation[1],
    padding: theme.global.space.small,
    borderRadius: 4,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
  usernameInput: {
    fontSize: 20,
    color: theme.global.colors.text.high,
  },
  usernameInputIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: theme.global.space.small,
    justifyContent: 'center',
  },
})

export default WelcomeScreen
