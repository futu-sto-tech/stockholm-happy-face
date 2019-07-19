import * as Amplitude from 'expo-analytics-amplitude'

export const SCREENS = {
  WELCOME: 'screen-welcome',
  PROFILE: 'screen-profile',
  NEW_ENTRY: 'screen-new-entry',
  ENTRY: 'screen-new-entry',
  CONFIRM_ENTRY: 'screen-confirm-new-entry',
}

export const logScreen = screen => {
  Amplitude.logEvent(screen)
}
