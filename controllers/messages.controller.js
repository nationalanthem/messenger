const db = require('../database')

const getLastMessageFromEachUser = async (req, res) => {
  const ownersByIdString =
    'SELECT r.id AS room_id, u.id AS user_id, u.username, u.avatar FROM users AS u INNER JOIN rooms AS r ON u.id = r.owner WHERE r.partner = $1'
  const partnersByIdString =
    'SELECT r.id AS room_id, u.id AS user_id, u.username, u.avatar FROM users AS u INNER JOIN rooms AS r ON u.id = r.partner WHERE r.owner = $1'
  const lastMessageString =
    'SELECT id AS message_id, text, created_at FROM messages WHERE id = (SELECT MAX(id) FROM messages WHERE room_id = $1)'

  try {
    const ownersByIdQuery = await db.query(ownersByIdString, [req.user.id])
    const partnersByIdQuery = await db.query(partnersByIdString, [req.user.id])

    const ownersIdx = ownersByIdQuery.rows.map((row) => row.user_id)

    const participants = ownersByIdQuery.rows.concat(
      partnersByIdQuery.rows.filter((partnerRow) => {
        if (!ownersIdx.includes(partnerRow.user_id)) {
          return true
        }
      })
    )

    for (const participant of participants) {
      const lastMessageQuery = await db.query(lastMessageString, [participant.room_id])
      participant.lastMessage = lastMessageQuery.rows.length ? lastMessageQuery.rows[0] : null
    }

    res.json(participants)
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const getDialogData = async (req, res) => {
  const senderDataString = 'SELECT id, username, avatar, last_seen FROM users WHERE id = $1'
  const messagesString = 'SELECT * FROM messages WHERE room_id = $1 ORDER BY id'
  const getRoomString = 'SELECT id FROM rooms WHERE owner IN ($1, $2) AND partner IN ($1, $2)'
  const createRoomString = 'INSERT INTO rooms (owner, partner) VALUES ($1, $2) RETURNING id'

  try {
    const senderDataQuery = await db.query(senderDataString, [req.params.id])
    const getRoomQuery = await db.query(getRoomString, [req.user.id, req.params.id])

    let room_id
    let messages

    if (getRoomQuery.rows.length) {
      messages = await db.query(messagesString, [getRoomQuery.rows[0].id])
      room_id = getRoomQuery.rows[0].id
    } else {
      const createRoomQuery = await db.query(createRoomString, [req.user.id, req.params.id])
      messages = await db.query(messagesString, [createRoomQuery.rows[0].id])
      room_id = createRoomQuery.rows[0].id
    }

    const dialogData = {
      room_id,
      user_id: senderDataQuery.rows[0].id,
      username: senderDataQuery.rows[0].username,
      avatar: senderDataQuery.rows[0].avatar,
      last_seen: senderDataQuery.rows[0].last_seen,
      messages: messages.rows.map((row) => ({
        message_id: row.id,
        text: row.text,
        type: row.sent_by === req.user.id ? 'to' : 'from',
        created_at: row.created_at,
      })),
    }

    res.json({
      ...dialogData,
    })
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const sendMessageToUser = async (req, res) => {
  const addMessageString = 'INSERT INTO messages (text, room_id, sent_by) VALUES ($1, $2, $3)'

  try {
    await db.query(addMessageString, [req.body.text, req.params.id, req.user.id])

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
