const db = require('../database')

const getLastMessageFromEachUser = async (req, res) => {
  const sendersByIdString =
    'SELECT u.id AS user_id, u.username, u.avatar FROM users AS u INNER JOIN messages AS m ON u.id = m.sender WHERE m.receiver = $1 GROUP BY u.id'

  const lastMessageString =
    'SELECT id AS message_id, text FROM messages WHERE id = (SELECT MAX(id) FROM messages WHERE sender IN ($1, $2) AND receiver IN ($1, $2))'

  try {
    const sendersByIdQuery = await db.query(sendersByIdString, [req.user.id])

    for (const sender of sendersByIdQuery.rows) {
      const lastMessageQuery = await db.query(lastMessageString, [req.user.id, sender.user_id])
      sender.lastMessage = lastMessageQuery.rows[0]
    }

    res.json(sendersByIdQuery.rows)
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const getDialogData = async (req, res) => {
  const senderDataString = 'SELECT id, username, avatar FROM users WHERE id = $1'
  const messagesString =
    'SELECT * FROM messages WHERE sender IN ($1, $2) AND receiver IN ($1, $2) ORDER BY id'

  try {
    const senderDataQuery = await db.query(senderDataString, [req.params.id])
    const messagesQuery = await db.query(messagesString, [req.params.id, req.user.id])

    const senderData = {
      user_id: senderDataQuery.rows[0].id,
      username: senderDataQuery.rows[0].username,
      avatar: senderDataQuery.rows[0].avatar,
    }

    const messages = []

    messagesQuery.rows.forEach((row) => {
      messages.push({
        message_id: row.id,
        text: row.text,
        type: row.sender === req.user.id ? 'to' : 'from',
      })
    })

    res.json({
      user_id: senderData.user_id,
      username: senderData.username,
      avatar: senderData.avatar,
      messages,
    })
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const sendMessageToUser = async (req, res) => {
  const string = 'INSERT INTO messages (text, sender, receiver) VALUES ($1, $2, $3)'

  try {
    await db.query(string, [req.body.text, req.user.id, req.params.id])

    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

module.exports = {
  getLastMessageFromEachUser,
  getDialogData,
  sendMessageToUser,
}
