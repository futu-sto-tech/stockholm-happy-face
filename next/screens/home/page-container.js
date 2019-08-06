import React from 'react'

import backend from '../../lib/backend'
import { login } from '../../lib/auth'
import { debounce } from '../../lib/utils'
import HomePage from './page'

class HomePageContainer extends React.Component {
  state = {
    username: '',
    loading: false,
    users: [],
  }

  handleLogin = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    try {
      const response = await backend.get(`/users/name/${this.state.username}`)
      login({ token: response.data.id })
    } catch (error) {
      console.log('Create new user')
      const postResponse = await backend.post('/users', {
        name: this.state.username,
      })
      login({ token: postResponse.data.id })
    }
  }

  handleChangeUsername = ({ target: { value: username } }) => {
    this.setState({ username })

    if (username.length === 0) {
      this.setState({ users: [] })
    } else {
      debounce(this.fetchUsers(), 250)
    }
  }

  fetchUsers = async () => {
    try {
      const response = await backend.get('/users', {
        params: { query: this.state.username },
      })
      this.setState({ users: response.data.map(user => user.name) })
    } catch (error) {
      console.log(error)
    }
  }

  handleSelectUsername = username => this.setState({ username })

  render() {
    return (
      <HomePage
        username={this.state.username}
        onChangeUsername={this.handleChangeUsername}
        onSelectUsername={this.handleSelectUsername}
        loading={this.state.loading}
        onLogin={this.handleLogin}
        users={this.state.users}
      />
    )
  }
}

export default HomePageContainer
