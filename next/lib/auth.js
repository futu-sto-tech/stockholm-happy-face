import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const TOKEN_KEY = 'token'

export const login = ({ token }) => {
  cookie.set(TOKEN_KEY, JSON.stringify(token), { expires: 1 })
  Router.push('/profile')
}

export const logout = () => {
  cookie.remove(TOKEN_KEY)

  window.localStorage.setItem('logout', Date.now())
  Router.push('/')
}

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends React.Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(context) {
      const token = auth(context)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context))

      return { ...componentProps, token, user: JSON.parse(token) }
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = context => {
  const { token } = nextCookie(context)

  /*
   * This happens on server only, context.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (context.req && !token) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/')
  }

  return token
}
