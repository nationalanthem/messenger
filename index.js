require('dotenv').config()

const express = require('express')
const authRouter = require('./routes/auth.route')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/api', authRouter)

app.listen(PORT, () => {
  console.log(`[Server]: Listening on port ${PORT}...`)
})
