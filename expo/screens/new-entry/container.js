import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, View, Keyboard } from 'react-native'

import i18n from '../../lib/i18n'
import backend from '../../lib/backend'
import theme from '../../theme'
import NewEntryScreen from './screen'

const WAIT_INTERVAL = 750

const NewEntryContainer = ({ navigation }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [timer, setTimer] = useState(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    navigation.setParams({
      query,
      onChangeQuery: newValue => {
        navigation.setParams({ query: newValue })
        setQuery(newValue)
      },
    })
  }, [])

  async function fetchResults() {
    const results = await backend.searchGifImages(query)
    setResults(results)
  }

  useEffect(() => {
    clearTimeout(timer)

    setTimer(
      setTimeout(() => {
        if (query.length === 0) {
          setResults([])
        } else {
          fetchResults()
        }
      }, WAIT_INTERVAL)
    )
  }, [query])

  function handlePressResult(image) {
    const user = navigation.getParam('user')
    navigation.navigate('ConfirmEntry', { user, image })
  }

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    const newResults = await backend.searchGifImages(query, {
      offset: results.length,
    })
    setResults([...results, ...newResults])
    setIsLoadingMore(false)
  }

  return (
    <NewEntryScreen
      results={results}
      onPressResult={handlePressResult}
      onLoadMore={handleLoadMore}
      loadingMore={isLoadingMore}
    />
  )
}

const styles = StyleSheet.create({
  textInputView: {
    backgroundColor: theme.global.colors.elevation[2],
    borderRadius: 4,
    flex: 1,
    marginHorizontal: theme.global.space.small,
    alignSelf: 'stretch',
    marginVertical: theme.global.space.xxsmall,
    justifyContent: 'center',
  },
  textInput: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.medium,
    fontWeight: '500',
    paddingHorizontal: theme.global.space.small,
  },
})

NewEntryContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={styles.textInputView}>
      <TextInput
        value={navigation.getParam('query', '')}
        onChangeText={navigation.getParam('onChangeQuery', null)}
        placeholder={i18n.t('newEntry.navigation.input.placeholder')}
        placeholderTextColor={theme.global.colors.placeholder}
        style={styles.textInput}
        autoFocus={true}
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  ),
})

export default NewEntryContainer
