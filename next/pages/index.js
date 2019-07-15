import nextCookie from 'next-cookies'

import HomeScreen from '../screens/home'

HomeScreen.getInitialProps = context => {
  const { token } = nextCookie(context)

  if (token) {
    if (process.browser) {
      Router.push('/profile')
    } else {
      context.res.writeHead(302, { Location: '/profile' })
      context.res.end()
    }
  }

  return {}
}

export default HomeScreen
