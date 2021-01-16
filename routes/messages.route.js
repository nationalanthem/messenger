const express = require('express')
const messagesController = require('../controllers/messages.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.get(
  '/messages/last',
  authMiddleware.verifyToken,
  messagesController.getLastMessageFromEachUser
)

router.get('/messages/from/:id', authMiddleware.verifyToken, messagesController.getDialogData)

router.post(
  '/messages/sendTo/:id',
  authMiddleware.verifyToken,
  messagesController.sendMessageToUser
)

module.exports = router
