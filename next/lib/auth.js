import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

import backend from './backend'

const TOKEN_KEY = 'token'

export const login = ({ token }) => {
  cookie.set(TOKEN_KEY, token, { expires: 1 })
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
      const user = await auth(context)

      context.user = user
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context))

      return { ...componentProps, user }
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

export const auth = async context => {
  const { token: userId } = nextCookie(context)

  let user = null
  if (userId) {
    try {
      const response = await backend.get(`/users/${userId}`)
      user = response.data
    } catch (error) {
      console.log('User not found')
    }
  }

  if (context.req && !user) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return
  }

  if (!user) {
    Router.push('/')
  }

  return user
}
