import React from 'react'
import { withRouter } from 'next/router'

import backend from '../../lib/backend'
import { logout } from '../../lib/auth'
import ProfilePage from './page'

const fetchEntries = async userId => {
  try {
    const [userResponse, entryResponse] = await Promise.all([
      backend.get('/entries', { params: { user: userId } }),
      backend.get('/entries', { params: { user: userId, week: 'current' } }),
    ])

    const currentEntry =
      entryResponse.data.length > 0 ? entryResponse.data[0] : null
    return {
      currentEntry,
      entries: userResponse.data
        .reverse()
        .filter(entry => entry.id !== (currentEntry || {}).id),
    }
  } catch (error) {
    console.log(error)
    return { currentEntry: null, entries: [] }
  }
}

class ProfilePageContainer extends React.Component {
  state = { query: '', isDeletingEntry: false }

  static async getInitialProps(context) {
    return await fetchEntries(context.user.id)
  }

  handleSubmitQuery = async event => {
    event.preventDefault()

    if (this.state.query.includes('http')) {
      try {
        await backend.post('/entries', {
          user: this.props.user.id,
          gif: { url: this.state.query },
        })
        this.props.router.push({ pathname: '/profile' })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.props.router.push({
        pathname: '/new',
        query: { query: this.state.query },
      })
    }
  }

  handleDeleteEntry = async entry => {
    this.setState({ isDeletingEntry: entry.id })
    try {
      const url = `/entries/${entry.id}`
      await backend.delete(url)
      this.props.router.push({ pathname: '/profile' })
    } catch (error) {
      console.log(error)
      this.setState({ isDeletingEntry: false })
    }
  }

  render() {
    return (
      <ProfilePage
        entries={this.props.entries}
        currentEntry={this.props.currentEntry}
        onLogout={logout}
        query={this.state.query}
        onSubmitQuery={this.handleSubmitQuery}
        onChangeQuery={({ target: { value } }) =>
          this.setState({ query: value })
        }
        onDeleteEntry={this.handleDeleteEntry}
        isDeletingEntry={this.state.isDeletingEntry}
        currentUser={this.props.user}
      />
    )
  }
}

export default withRouter(ProfilePageContainer)
