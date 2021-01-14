const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/user/me', authMiddleware.verifyToken, userController.getMyUserdata)

module.exports = router
