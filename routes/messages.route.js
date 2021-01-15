const express = require('express')
const messagesController = require('../controllers/messages.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/messages/all', authMiddleware.verifyToken, messagesController.getAllMessages)

module.exports = router
