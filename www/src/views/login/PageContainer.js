import React, { useContext, useState, useEffect } from 'react'

import { debounce } from '../../utils'
import Context, { ACTION_TYPE } from '../../context/Context'
import { login } from '../../context/actions'
import apiClient from '../../api'
import Page from './Page'

const LoginPageContainer = () => {
  const [users, setUsers] = useState([])
  let { state, dispatch } = useContext(Context)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await apiClient.get('/users', {
          params: { query: state.username },
        })
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (state.username.length === 0) {
      setUsers([])
    } else {
      debounce(fetchUsers(), 250)
    }
  }, [state.username])

  const handleClickUser = user => {
    setUsers([])
    dispatch({
      type: ACTION_TYPE.UPDATE_USERNAME,
      payload: { username: user.name },
    })
  }

  return (
    <Page
      onSubmit={event => {
        event.preventDefault()
        login(state, dispatch)
      }}
      username={state.username}
      onChangeUsername={({ target: { value } }) =>
        dispatch({
          type: ACTION_TYPE.UPDATE_USERNAME,
          payload: { username: value },
        })
      }
      loading={state.loadingUser}
      users={users.filter(user => user.name !== state.username)}
      onClickUser={handleClickUser}
    />
  )
}

export default LoginPageContainer
