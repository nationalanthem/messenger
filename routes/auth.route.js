const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', authMiddleware.checkDuplicateUsername, authController.register)
router.post('/login', authController.login)

module.exports = router
