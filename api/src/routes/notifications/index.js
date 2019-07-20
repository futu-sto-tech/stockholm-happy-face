const { Router } = require('express')
const { Expo } = require('expo-server-sdk')

const app = require('../../utils/app')
const { prisma } = require('../../generated/prisma-client')

const router = Router()
const expo = new Expo()

router.post('/push', async (req, res) => {
  const users = await prisma.users({ where: { expoPushToken_not: null } })
  const expoPushTokens = users
    .map(user => user.expoPushToken)
    .filter(token => Expo.isExpoPushToken(token))
  const messages = expoPushTokens.map(token => ({
    to: token,
    sound: 'default',
    body: 'Time for Smileys!',
  }))

  const chunks = expo.chunkPushNotifications(messages)
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      console.log(ticketChunk)
    } catch (error) {
      console.error(error)
    }
  }

  res.json({ status: 'ok' })
})

app.use('/api/notifications', router)

module.exports = app
