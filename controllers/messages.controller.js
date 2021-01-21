const db = require('../database')

const getLastMessageFromEachUser = async (req, res) => {
  const sendersByIdString =
    'SELECT u.id AS user_id, u.username, u.avatar FROM users AS u INNER JOIN messages AS m ON u.id = m.sender WHERE m.receiver = $1 GROUP BY u.id'

  const receiversByIdString =
    'SELECT u.id AS user_id, u.username, u.avatar FROM users AS u INNER JOIN messages AS m ON u.id = m.receiver WHERE m.sender = $1 GROUP BY u.id'

  const lastMessageString =
    'SELECT id AS message_id, text, created_at FROM messages WHERE id = (SELECT MAX(id) FROM messages WHERE sender IN ($1, $2) AND receiver IN ($1, $2))'

  try {
    const sendersByIdQuery = await db.query(sendersByIdString, [req.user.id])
    const receiversByIdQuery = await db.query(receiversByIdString, [req.user.id])

    const sendersIdx = sendersByIdQuery.rows.map((row) => row.user_id)

    const participants = sendersByIdQuery.rows.concat(
      receiversByIdQuery.rows.filter((receiverRow) => {
        if (!sendersIdx.includes(receiverRow.user_id)) {
          return true
        }
      })
    )

    for (const participant of participants) {
      const lastMessageQuery = await db.query(lastMessageString, [req.user.id, participant.user_id])
      participant.lastMessage = lastMessageQuery.rows[0]
    }

    res.json(participants)
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const getDialogData = async (req, res) => {
  const senderDataString = 'SELECT id, username, avatar, last_seen FROM users WHERE id = $1'
  const messagesString =
    'SELECT * FROM messages WHERE sender IN ($1, $2) AND receiver IN ($1, $2) ORDER BY id'

  try {
    const senderDataQuery = await db.query(senderDataString, [req.params.id])
    const messagesQuery = await db.query(messagesString, [req.params.id, req.user.id])

    const dialogData = {
      user_id: senderDataQuery.rows[0].id,
      username: senderDataQuery.rows[0].username,
      avatar: senderDataQuery.rows[0].avatar,
      last_seen: senderDataQuery.rows[0].last_seen,
      messages: [],
    }

    messagesQuery.rows.forEach((row) => {
      dialogData.messages.push({
        message_id: row.id,
        text: row.text,
        type: row.sender === req.user.id ? 'to' : 'from',
        created_at: row.created_at,
      })
    })

    res.json({
      ...dialogData,
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

    await db.query('UPDATE users SET last_seen = $1 WHERE id = $2', [Date.now(), req.user.id])
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
