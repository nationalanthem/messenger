const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
const messagesRouter = require('./routes/messages.route')

const connectedUsers = {}

module.exports = (app, io) => {
  app.use('/api', [authRouter, userRouter, messagesRouter])

  io.on('connection', (socket) => {
    socket.on('init', (userId) => {
      connectedUsers[socket.id] = { userId, roomId: null }
    })

    socket.on('joinChatroom', (roomId) => {
      connectedUsers[socket.id].roomId = roomId
    })

    socket.on('exitChatroom', () => {
      connectedUsers[socket.id].roomId = null
    })

    socket.on('sendMsg', (payload) => {
      const {
        room_id,
        from_user,
        to_user,
        text,
        userdata: { avatar, username },
      } = payload

      for (const [socketId, userData] of Object.entries(connectedUsers)) {
        if (userData.roomId === room_id) {
          const type = userData.userId === from_user ? 'to' : 'from'
          socket.to(socketId).emit('sendMsg', { text, room_id, from_user, to_user, type })
        } else if (to_user === userData.userId) {
          socket.to(socketId).emit('updLastMessage', {
            text,
            to_user,
            from_user,
            avatar,
            username,
          })
        }
      }
    })

    socket.on('disconnect', () => {
      delete connectedUsers[socket.id]
    })
  })
}
