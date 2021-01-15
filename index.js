require('dotenv').config()

const express = require('express')

const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
const messagesRouter = require('./routes/messages.route')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/api', [authRouter, userRouter, messagesRouter])

app.listen(PORT, () => {
  console.log(`[Server]: Listening on port ${PORT}...`)
})
