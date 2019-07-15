import React from 'react'
import { withRouter } from 'next/router'

import backend from '../../lib/backend'
import { auth } from '../../lib/auth'
import NewPage from './page'

const WAIT_INTERVAL = 750
const ENTER_KEY = 13

class NewPageContainer extends React.Component {
  static async getInitialProps(context) {
    const token = auth(context)
    const user = JSON.parse(token)
    return { query: context.query.query, user }
  }

  state = {
    query: '',
    loading: false,
    results: [],
    offset: 0,
    selected: null,
    saving: false,
  }

  timer = null

  async componentDidMount() {
    await this.setState({ query: this.props.query })
    this.fetchResults()
  }

  fetchResults = async () => {
    this.setState({ loading: true })
    try {
      const response = await backend.get('/gif/search', {
        params: { query: this.state.query },
      })
      this.setState({ results: response.data.images, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  handleChangeQuery = ({ target: { value } }) => {
    clearTimeout(this.timer)

    this.setState({ query: value })

    this.timer = setTimeout(() => {
      if (this.state.query.length === 0) {
        this.setState({ results: [] })
      } else {
        this.fetchResults()
      }
    }, WAIT_INTERVAL)
  }

  handleKeyDownInput = ({ keyCode }) => {
    if (keyCode === ENTER_KEY) {
      this.fetchResults()
    }
  }

  handleClickResult = gif => {
    this.setState({
      selected: gif === this.state.selected ? null : gif,
    })
  }

  handleClickDeselect = () => {
    this.setState({ selected: null })
  }

  handleSaveEntry = async () => {
    this.setState({ saving: true })
    try {
      const { id, ...giphyData } = this.state.selected
      await backend.post('/entries', {
        user: this.props.user.id,
        gif: { giphyId: id, ...giphyData.original },
      })
      this.props.router.push({ pathname: '/profile' })
    } catch (error) {
      this.setState({ saving: false })
    }
  }

  handleLoadMore = async () => {
    console.log('more results')
    try {
      const response = await backend.get('/gif/search', {
        params: { query: this.state.query, offset: this.state.results.length },
      })
      this.setState({
        results: [...this.state.results, ...response.data.images],
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <NewPage
        query={this.state.query}
        onChangeQuery={this.handleChangeQuery}
        results={this.state.results}
        onClickResult={this.handleClickResult}
        selected={this.state.selected}
        onDeselect={this.handleClickDeselect}
        onSaveEntry={this.handleSaveEntry}
        isSaving={this.state.saving}
        onLoadMore={this.handleLoadMore}
        onKeyDownInput={this.handleKeyDownInput}
      />
    )
  }
}

export default withRouter(NewPageContainer)
