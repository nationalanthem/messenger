require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

require('./server')(app, io)

server.listen(PORT, () => {
  console.log(`[Server]: Listening on port ${PORT}...`)
})
