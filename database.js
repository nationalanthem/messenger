const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

if (connectionString == null) {
  throw new Error('Postgres connection string is not defined')  
} 

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })

module.exports = {
  query(sql, values) {
    return pool.query(sql, values)
  },
}
