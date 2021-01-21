const db = require('../database')

const getMyUserdata = async (req, res) => {
  const string = 'SELECT id as user_id, username, avatar FROM users WHERE id = $1'
  try {
    const { rows } = await db.query(string, [req.user.id])
    res.json({ ...rows[0] })
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

const getUsersByUsername = async (req, res) => {
  const string =
    'SELECT id as user_id, username, avatar FROM users WHERE username ~* $1 AND id != $2'
  try {
    const { rows } = await db.query(string, [req.params.username, req.user.id])
    res.json({ users: rows })
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

module.exports = {
  getMyUserdata,
  getUsersByUsername,
}
