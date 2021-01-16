const db = require('../database')

const getMyUserdata = async (req, res) => {
  const string = 'SELECT id, username, avatar FROM users WHERE id = $1'
  try {
    const { rows } = await db.query(string, [req.user.id])
    res.json({ ...rows[0] })
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

module.exports = {
  getMyUserdata,
}
