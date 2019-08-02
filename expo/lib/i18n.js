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
      headerBackTitle: 'Profile',
    },
    currentEntry: {
      weekLabel: 'Week %{week}',
      currentLabel: 'Current',
      deleteButton: 'Delete',
    },
    entryForm: {
      title: "How's your week?",
      placeholder: 'Happy, sad, crazy...',
    },
    prevWeeksHeading: 'Previous weeks',
  },
  entry: {
    navigation: {
      title: 'Week %{week}',
    },
    deleteButton: 'Delete',
    deletePrompt: {
      title: 'Delete entry?',
      message:
        'This entry will be removed completely. You will not be able to undo this action.',
      cancelButton: 'Cancel',
      deleteButton: 'Delete',
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
    emptyHelpMessage: 'Search for a GIF',
    loadMoreButton: 'Load more',
  },
  confirmEntry: {
    saveButton: 'Save',
    navigation: {
      title: 'Your week was like...',
    },
  },
  archive: {
    navigation: {
      title: 'This week in GIFs',
    },
    submitEntry: {
      message: 'Be the first to submit an entry this week!',
      button: 'Find a GIF',
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
      headerBackTitle: 'Profil',
    },
    currentEntry: {
      weekLabel: 'Vecka %{week}',
      currentLabel: 'Nuvarande',
      deleteButton: 'Radera',
    },
    entryForm: {
      title: 'Hur är din vecka?',
      placeholder: 'Glad, ledsen, galen...',
    },
    prevWeeksHeading: 'Tidigare veckor',
  },
  entry: {
    navigation: {
      titlePrefix: 'Vecka',
    },
    deleteButton: 'Radera',
    deletePrompt: {
      title: 'Radera inlägg?',
      message:
        'Inlägget kommer att raderas helt. Du kommer inte kunna återskapa inlägget.',
      cancelButton: 'Avbryt',
      deleteButton: 'Radera',
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
    emptyHelpMessage: 'Sök efter en GIF',
    loadMoreButton: 'Ladda fler',
  },
  confirmEntry: {
    saveButton: 'Spara',
    navigation: {
      title: 'Din vecka var som...',
    },
  },
  archive: {
    navigation: {
      title: 'Veckan i GIFs',
    },
    submitEntry: {
      message: 'Bli den första att posta ett inlägg den här veckan!',
      button: 'Hitta en GIF',
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
