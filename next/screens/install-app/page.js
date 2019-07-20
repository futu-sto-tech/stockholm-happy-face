import React from 'react'
import {
  Button,
  Form,
  TextInput,
  Text,
  Box,
  Heading,
  Stack,
  Grid,
  ResponsiveContext,
} from 'grommet'
import { Apple } from 'grommet-icons'

const InstallAppPage = () => (
  <Box
    pad="large"
    align="center"
    justify="center"
    style={{ height: '100vh' }}
    background="brand"
  >
    <Heading>Download the Smileys App</Heading>
    <ResponsiveContext.Consumer>
      {size => (
        <Grid
          gap="small"
          columns={size !== 'small' ? ['flex', 'flex'] : undefined}
        >
          <Button
            href="itms-services://?action=download-manifest&url=https://smileys.now.sh/static/smileys-app.plist"
            icon={<Apple />}
            color="white"
            primary
            label="Install iOS app"
          />
          <Button
            href="itms-services://?action=download-manifest&url=https://smileys.now.sh/static/smileys-app-beta.plist"
            icon={<Apple />}
            color="black"
            primary
            label="Install iOS app (Beta)"
          />
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  </Box>
)

export default InstallAppPage
