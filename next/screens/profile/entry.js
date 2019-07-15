import { Button, Text, Box, Image } from 'grommet'

import Spinner from '../../components/spinner'

const Entry = ({ gif, week, fromNow, onDelete, loading }) => (
  <Box overflow="hidden">
    <Box flex={{ grow: 1 }} style={{ display: 'flow-root' }} background="black">
      <Image
        src={gif.url}
        alt="GIF"
        alignSelf="center"
        fit="contain"
        style={{ maxWidth: '100%' }}
      />
    </Box>
    <Box direction="row" flex={{ shrink: 0 }}>
      <Box pad="medium" flex={{ grow: 1 }} justify="center">
        <Text size="medium" weight="bold">
          Week {week}
        </Text>
        <Text size="small">{fromNow}</Text>
      </Box>
      <Box pad="medium" justify="center">
        {loading ? (
          <Spinner />
        ) : (
          <Button label={'Delete'} onClick={onDelete} primary />
        )}
      </Box>
    </Box>
  </Box>
)

export default Entry
