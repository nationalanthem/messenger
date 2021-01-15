const db = require('../database')

const getAllMessages = async (req, res) => {
  const string =
    'SELECT m.id AS message_id, u.id::TEXT AS user_id, u.username, u.avatar, m.text FROM messages AS m INNER JOIN users AS u ON u.id = m.sender AND m.receiver = $1'
  try {
    const { rows } = await db.query(string, [req.user.id])
    res.json({ messages: rows })
  } catch (err) {
    res.sendStatus(500)
  }
}

module.exports = {
  getAllMessages,
}
