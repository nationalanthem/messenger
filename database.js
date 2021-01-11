const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query(sql, values) {
    return pool.query(sql, values)
  },
}
