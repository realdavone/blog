import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

const db = mysql.createPool({
  host: process.env.MYSQL_SERVER_NAME,
  user: process.env.MYSQL_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME
})

export default db