const db = require('../database')
const jwt = require('jsonwebtoken')

const checkDuplicateUsername = async (req, res, next) => {
  const { username } = req.body
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username])

  if (rows.length) {
    res.status(409).json({ message: 'Пользователь с таким именем уже существует' })
    return
  }

  next()
}

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(403)

  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.sendStatus(401)

    req.user = {
      id: decoded.id,
    }

    next()
  })
}

module.exports = {
  checkDuplicateUsername,
  verifyToken,
}
