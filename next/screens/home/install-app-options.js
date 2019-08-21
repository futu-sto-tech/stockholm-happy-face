import React from 'react'
import { Button, Box, Heading, Text } from 'grommet'
import { Apple, InstallOption } from 'grommet-icons'

const InstallAppOptions = () => (
  <Box pad="large" align="center" justify="center" background="brand">
    <Heading size="small">Install the App</Heading>
    <Button
      href="itms-services://?action=download-manifest&url=https://smileys.now.sh/static/smileys-app.plist"
      icon={<Apple />}
      color="white"
      primary
      label="Smileys for iOS"
    />
    <Box align="center" margin={{ top: 'medium' }}>
      <Button
        href="itms-services://?action=download-manifest&url=https://smileys.now.sh/static/smileys-app-beta.plist"
        label={
          <Box direction="row" align="center">
            <Text size="medium" margin={{ right: 'xsmall' }}>
              Or try out the iOS Beta
            </Text>
            <InstallOption size="16px" />
          </Box>
        }
        plain
      />
    </Box>
  </Box>
)

export default InstallAppOptions
