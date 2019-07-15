import React from 'react'
import Link from 'next/link'
import { Text, Box, TextInput, Button, Image, Grid, Layer } from 'grommet'
import { Close } from 'grommet-icons'

import Spinner from '../../components/spinner'

const NewPage = ({
  query,
  onChangeQuery,
  results,
  onClickResult,
  selected,
  onDeselect,
  onSaveEntry,
  isSaving,
  onLoadMore,
  onKeyDownInput,
}) => (
  <Box style={{ height: '100vh' }} background="black">
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      flex={{ shrink: 0 }}
      align="center"
      background="dark-1"
    >
      <Box width="xlarge">
        <Text size="small" weight="bold" margin={{ bottom: 'xsmall' }}>
          How was your week?
        </Text>
        <Box direction="row" align="center">
          <TextInput
            size="medium"
            placeholder="Search here..."
            value={query}
            onChange={onChangeQuery}
            onKeyDown={onKeyDownInput}
          />
          <Box margin={{ left: 'small' }}>
            <Link href="/profile">
              <Button icon={<Close />} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box
      flex={{ grow: 1, shrink: 1 }}
      overflow="auto"
      pad="small"
      align="center"
    >
      <Box width="xlarge">
        <Grid
          gap="xsmall"
          style={{
            gridAutoRows: '170px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          }}
        >
          {results.map(result => (
            <Box
              key={result.id}
              onClick={() => onClickResult(result)}
              background="dark-1"
            >
              <Image fit="cover" src={result.preview.url} alt={result.title} />
            </Box>
          ))}
        </Grid>

        <Box margin={{ vertical: 'medium' }} flex={{ shrink: 0 }}>
          <Button label="Load more" onClick={onLoadMore} color="accent-2" />
        </Box>
      </Box>
    </Box>

    {selected && (
      <Layer onEsc={onDeselect} onClickOutside={onDeselect} animate={true}>
        <Box background="black" fill>
          <Box pad="medium">
            <Text weight="bold" size="medium" textAlign="center">
              Are you happy with this one?
            </Text>
          </Box>
          <Box align="center" justify="center" width="large" pad="small">
            <Box>
              <Image
                style={{ maxWidth: '100%' }}
                src={selected.original.url}
                alt={selected.title}
              />
            </Box>
          </Box>
          <Box
            flex={{ shrink: 0 }}
            pad="medium"
            direction="row"
            justify="between"
            align="center"
          >
            <Button
              label="Cancel"
              onClick={onDeselect}
              color="status-unknown"
            />
            {isSaving ? (
              <Spinner />
            ) : (
              <Button
                label="Save"
                primary
                onClick={onSaveEntry}
                color="status-ok"
              />
            )}
          </Box>
        </Box>
      </Layer>
    )}
  </Box>
)

export default NewPage
