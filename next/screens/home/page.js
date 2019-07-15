import React from 'react'
import styled from 'styled-components'
import {
  Button as GrommetButton,
  Form,
  TextInput,
  Text,
  Box,
  Heading,
  Stack,
} from 'grommet'
import { FormNextLink } from 'grommet-icons'

import Spinner from '../../components/spinner'

const Button = styled(GrommetButton)`
  padding: ${props => props.theme.global.edgeSize.xsmall};
`

const Home = ({
  username,
  onChangeUsername,
  onSelectUsername,
  onLogin,
  loading,
  users,
}) => (
  <Box
    pad="large"
    direction="column"
    justify="center"
    style={{ height: '100vh' }}
    background="brand"
  >
    <Box direction="row" justify="center" align="center" flex={{ grow: 1 / 3 }}>
      <Heading size="large">Smileys</Heading>
    </Box>

    <Box
      flex={{ grow: 2 / 3 }}
      direction="column"
      justify="center"
      width="large"
      alignSelf="center"
    >
      <Form onSubmit={onLogin}>
        <Text>Username</Text>
        <Stack anchor="right" margin={{ top: 'xsmall' }}>
          <TextInput
            required
            value={username}
            onChange={onChangeUsername}
            component={TextInput}
            size="large"
            suggestions={users}
            onSelect={({ suggestion }) => onSelectUsername(suggestion)}
          />
          <Button
            type="submit"
            icon={loading ? <Spinner /> : <FormNextLink />}
            primary
            disabled={loading}
            margin={{ right: 'xsmall' }}
            color="accent-2"
          />
        </Stack>
      </Form>
    </Box>
  </Box>
)

export default Home
