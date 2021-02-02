const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

require('./server')(app, io) // init routes & ws events

if (isProd) {
  const CLIENT_ROOT = require('path').join(__dirname, 'client', 'build') 
  app.use(express.static(CLIENT_ROOT))
  app.get('*', (_, res) => res.sendFile('index.html', { root: CLIENT_ROOT }))
}

server.listen(PORT, () => {
  if (isProd) {
    console.log('[Server]: Server is running.')
  } else { 
    console.log(`[Server]: Listening on port ${PORT}...`)
  }
})
