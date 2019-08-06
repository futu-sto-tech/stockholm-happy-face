import nextCookie from 'next-cookies'

import backend from '../lib/backend'
import HomeScreen from '../screens/home'

HomeScreen.getInitialProps = async context => {
  const { token: userId } = nextCookie(context)

  if (userId) {
    let user = null
    try {
      user = await backend.get(`/users/${userId}`)
    } catch (error) {
      console.log('User not found')
    }

    if (user) {
      if (process.browser) {
        Router.push('/profile')
      } else {
        context.res.writeHead(302, { Location: '/profile' })
        context.res.end()
      }
    }
  }

  return {}
}

export default HomeScreen
