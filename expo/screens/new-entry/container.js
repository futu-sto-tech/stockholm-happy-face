import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

import i18n from '../../lib/i18n'
import backend from '../../lib/backend'
import NewEntryScreen from './screen'

const WAIT_INTERVAL = 750

const NewEntryContainer = ({ navigation }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [timer, setTimer] = useState(null)

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

  return <NewEntryScreen results={results} onPressResult={handlePressResult} />
}

const styles = StyleSheet.create({
  textInputView: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 16,
    alignSelf: 'stretch',
    marginBottom: 4,
    justifyContent: 'center',
  },
  textInput: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
})

NewEntryContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={styles.textInputView}>
      <TextInput
        value={navigation.getParam('query', '')}
        onChangeText={navigation.getParam('onChangeQuery', null)}
        placeholder={i18n.t('newEntry.navigation.input.placeholder')}
        placeholderTextColor="rgba(255, 255, 255, 0.38)"
        style={styles.textInput}
        autoFocus={true}
      />
    </View>
  ),
})

export default NewEntryContainer
