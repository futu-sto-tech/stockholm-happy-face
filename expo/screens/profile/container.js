import React from 'react'
import { NavigationEvents } from 'react-navigation'
import * as Haptics from 'expo-haptics'

import backend from '../../lib/backend'
import ProfileScreen from './screen'

class ProfileContainer extends React.Component {
  state = { user: null, entries: [], currentEntry: null, isDeleting: false }

  handlePressInput = () => {
    const user = this.props.navigation.getParam('user')
    this.props.navigation.navigate('NewEntry', { user })
  }

  handlePressEntry = async entry => {
    this.props.navigation.navigate('Entry', { entry })
    await Haptics.selectionAsync()
  }

  handlePressDeleteCurrentEntry = async () => {
    this.setState({ isDeleting: true })
    await backend.deleteEntry(this.state.currentEntry)
    const user = this.props.navigation.getParam('user')
    const userEntryProps = await backend.getUserEntries(user.id)
    this.setState({ ...userEntryProps, isDeleting: false })
  }

  handleWillFocus = async payload => {
    if (payload.action.type !== 'Navigation/BACK') {
      const user = this.props.navigation.getParam('user')
      const userEntryProps = await backend.getUserEntries(user.id)
      this.setState({ ...userEntryProps })
    }
  }

  render() {
    return (
      <>
        <NavigationEvents onWillFocus={this.handleWillFocus} />
        <ProfileScreen
          user={this.state.user}
          currentEntry={this.state.currentEntry}
          entries={this.state.entries}
          onPressInput={this.handlePressInput}
          onPressEntry={this.handlePressEntry}
          onPressDeleteCurrentEntry={this.handlePressDeleteCurrentEntry}
          isDeleting={this.state.isDeleting}
        />
      </>
    )
  }
}

export default ProfileContainer
