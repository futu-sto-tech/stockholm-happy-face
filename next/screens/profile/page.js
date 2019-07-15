import React from 'react'
import {
  Button,
  Text,
  Box,
  TextInput,
  Form,
  ResponsiveContext,
  Grid,
  Image,
} from 'grommet'

import Spinner from '../../components/spinner'

const SearchBox = ({ query, onChangeQuery, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Box pad="large">
      <Text alignSelf="center" margin={{ bottom: 'small' }} size="large">
        How was your week?
      </Text>
      <TextInput
        size="medium"
        placeholder="happy, sad, crazy..."
        value={query}
        onChange={onChangeQuery}
      />
      <Text size="small" margin={{ top: 'xsmall' }}>
        Search for a GIF or paste a link to one directly.
      </Text>
    </Box>
  </Form>
)

const ProfilePage = ({
  currentEntry,
  entries,
  onLogout,
  query,
  onSubmitQuery,
  onChangeQuery,
  onDeleteEntry,
  isDeletingEntry,
  currentUser,
}) => (
  <Box direction="column" style={{ height: '100vh' }} background="black">
    <Box
      align="center"
      pad={{ vertical: 'small', horizontal: 'medium' }}
      style={{ flexShrink: 0 }}
      background="brand"
    >
      <Box width="xlarge" direction="row" justify="between" align="center">
        <Box>
          <ResponsiveContext.Consumer>
            {size => size !== 'small' && <Text size="small">Welcome</Text>}
          </ResponsiveContext.Consumer>

          <strong>
            <Text size="medium">{currentUser.name}</Text>
          </strong>
        </Box>
        <Button onClick={onLogout} label="Logout" color="accent-2" />
      </Box>
    </Box>
    <Box
      flex={{ grow: 1, shrink: 1 }}
      overflow="scroll"
      pad="small"
      align="center"
    >
      {currentEntry ? (
        <Box width="medium">
          <Box style={{ display: 'flow-root' }} alignSelf="center">
            <Image
              src={currentEntry.gif.url}
              alt="GIF"
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </Box>

          <ResponsiveContext.Consumer>
            {size => (
              <Box
                direction="row"
                justify="between"
                align="center"
                pad={{
                  horizontal: size === 'small' ? 'medium' : null,
                  top: size === 'small' ? 'medium' : 'small',
                  bottom: 'large',
                }}
              >
                <Box>
                  <Text size="medium" weight="bold">
                    Week {currentEntry.week}
                  </Text>
                  <Text color="dark-4">Current</Text>
                </Box>
                <Box align="start">
                  {isDeletingEntry === currentEntry.id ? (
                    <Spinner />
                  ) : (
                    <Button
                      label={'Delete'}
                      onClick={() => onDeleteEntry(currentEntry)}
                      primary
                      color="status-warning"
                    />
                  )}
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Box>
      ) : (
        <Box width="large" alignSelf="center">
          <SearchBox
            query={query}
            onChangeQuery={onChangeQuery}
            onSubmit={onSubmitQuery}
          />
        </Box>
      )}
      <Box style={{ flex: 1 }} width="large" alignSelf="center">
        <Grid
          gap="xsmall"
          style={{
            gridAutoRows: '170px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          }}
        >
          {entries.map(entry => (
            <Box key={entry.id} background="dark-1">
              <Image fit="cover" src={entry.gif.url} />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  </Box>
)

export default ProfilePage
