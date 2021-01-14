const db = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const { username, password } = req.body
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username])

  if (!rows.length) return res.status(404).json({ message: 'Пользователь не найден' })

  const passwordIsValid = await bcrypt.compare(password, rows[0].password)
  if (!passwordIsValid)
    return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' })

  const user = {
    id: rows[0].id,
  }

  const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

  res.json({ ...user, token })
}

const register = async (req, res) => {
  const { username, password } = req.body

  const hash = await bcrypt.hash(password, 12)

  await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash])

  res.sendStatus(201)
}

module.exports = {
  login,
  register,
}
