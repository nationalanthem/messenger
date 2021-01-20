const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/user/me', authMiddleware.verifyToken, userController.getMyUserdata)
router.get('/user/:username', authMiddleware.verifyToken, userController.getUsersByUsername)

module.exports = router
