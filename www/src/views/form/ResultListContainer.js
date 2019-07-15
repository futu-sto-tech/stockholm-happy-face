import React, { useContext, useState, useEffect, useCallback } from 'react'

import apiClient from '../../api'
import { debounce } from '../../utils'
import Context, { ACTION_TYPE } from '../../context/Context'
import Flex from '../../components/Flex'
import ResultList from './styled/ResultList'

const ResultListContainer = () => {
  const [localState, setLocalState] = useState({
    results: [],
    loading: false,
  })
  const [offset, setOffset] = useState(0)
  const { state, dispatch } = useContext(Context)

  const fetchResults = useCallback(async () => {
    try {
      setLocalState(prevState => ({ ...prevState, loading: true }))
      const response = await apiClient.get('/gif/search', {
        params: { query: state.gifQuery, offset },
      })
      setLocalState(prevState => ({
        ...prevState,
        results: response.data.images,
        loading: false,
      }))
    } catch (error) {
      console.log(error)
      setLocalState(prevState => ({ ...prevState, loading: false }))
    }
  }, [state.gifQuery, offset])

  useEffect(() => {
    if (state.gifQuery.length === 0) {
      setLocalState(prevState => ({ ...prevState, results: [] }))
    } else {
      debounce(fetchResults(), 250)
    }
    setOffset(0)
  }, [fetchResults, state.gifQuery.length])

  useEffect(() => {
    if (!localState.loading && state.gifQuery.length > 0) {
      fetchResults()
    }
  }, [fetchResults, localState.loading, state.gifQuery.length])

  return (
    <ResultList.Wrapper>
      <ResultList>
        {localState.results.map(result => (
          <ResultList.Item
            key={result.id}
            selected={state.selectedGif.url === result.original.url}
          >
            <img
              src={result.original.url}
              onClick={() =>
                dispatch({
                  type: ACTION_TYPE.UPDATE_SELECTED_GIF,
                  payload: { gif: { id: result.id, ...result.original } },
                })
              }
              alt={result.title}
            />
          </ResultList.Item>
        ))}
      </ResultList>
      <Flex justify={offset > 0 ? 'space-between' : 'flex-end'}>
        {offset > 0 && (
          <ResultList.MoreButton
            onClick={() => {
              setOffset(offset - 25)
            }}
          >
            {localState.loading ? 'Loading...' : 'Back'}
          </ResultList.MoreButton>
        )}

        {localState.results.length === 25 && (
          <ResultList.MoreButton
            onClick={() => {
              setOffset(offset + 25)
            }}
          >
            {localState.loading ? 'Loading...' : 'Next'}
          </ResultList.MoreButton>
        )}
      </Flex>
    </ResultList.Wrapper>
  )
}

export default ResultListContainer
