import theme from '../theme'

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#202020',
    borderBottomWidth: 0,
    shadowColor: theme.global.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitleStyle: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.medium,
  },
  headerTintColor: theme.global.colors.text.medium,
}

export default defaultNavigationOptions
