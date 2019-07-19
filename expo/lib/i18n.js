import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

const en = {
  welcome: {
    input: {
      placeholder: 'Your username',
    },
  },
  profile: {
    navigation: {
      logoutButton: 'Logout',
    },
    currentEntry: {
      weekLabel: 'Week',
      currentLabel: 'Current',
      deleteButton: 'Delete',
    },
    entryForm: {
      title: "How's your week?",
      placeholder: 'Happy, sad, crazy...',
    },
  },
  entry: {
    deleteButton: 'Delete',
    navigation: {
      titlePrefix: 'Week',
    },
  },
  newEntry: {
    navigation: {
      input: {
        placeholder: 'Happy, sad, crazy...',
      },
      title: "How's your week?",
      backTitle: 'Search',
    },
  },
  confirmEntry: {
    saveButton: 'Save',
    navigation: {
      title: 'Your week was like...',
    },
  },
}

const sv = {
  welcome: {
    input: {
      placeholder: 'Ditt användarnamn',
    },
  },
  profile: {
    navigation: {
      logoutButton: 'Logga ut',
    },
    currentEntry: {
      weekLabel: 'Vecka',
      currentLabel: 'Nuvarande',
      deleteButton: 'Radera',
    },
    entryForm: {
      title: 'Hur är din vecka?',
      placeholder: 'Glad, ledsen, galen...',
    },
  },
  entry: {
    deleteButton: 'Radera',
    navigation: {
      titlePrefix: 'Vecka',
    },
  },
  newEntry: {
    navigation: {
      input: {
        placeholder: 'Glad, ledsen, galen...',
      },
      title: 'Hur är din vecka?',
      backTitle: 'Sök',
    },
  },
  confirmEntry: {
    saveButton: 'Spara',
    navigation: {
      title: 'Din vecka var som...',
    },
  },
}

i18n.fallbacks = true
i18n.defaultLocale = 'en'
i18n.translations = { en, sv }
i18n.locale = Localization.locale

export const setLocale = locale => {
  I18n.locale = locale
}

export const getCurrentLocale = () => I18n.locale

export default i18n
