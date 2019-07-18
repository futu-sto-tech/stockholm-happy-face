import React from 'react'
import { Button, Form, TextInput, Text, Box, Heading, Stack } from 'grommet'
import { Apple } from 'grommet-icons'

const InstallAppPage = () => (
  <Box
    pad="large"
    align="center"
    justify="center"
    style={{ height: '100vh' }}
    background="brand"
  >
    <Button
      href="itms-services://?action=download-manifest&url=https://smileys.now.sh/static/smileys-app.plist"
      icon={<Apple />}
      color="white"
      primary
      label="Install iOS"
    />
  </Box>
)

export default InstallAppPage
