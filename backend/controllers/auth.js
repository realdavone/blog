import bcrypt from 'bcryptjs' 
import db from '../db.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const login = (req, res) => {

  if(!req.body.email && !req.body.password) return res.status(400).json({ success: false, message: 'Chýba meno alebo heslo' })

  const q = 'SELECT * FROM users WHERE email = ?'

  db.query(q, req.body.email, (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    if(data.length === 0) return res.status(400).json({ success: false, message: 'Užívateľ nenájdený' })

    if(!bcrypt.compareSync(req.body.password, data[0].password)) return res.status(400).json({ success: false, message: 'Nesprávne heslo' })

    const token = jwt.sign({ id: data[0].id, email: data[0].email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' })

    let { password, ...user } = data[0]

    res.cookie('access-token', token, { httpOnly: true }).status(200).json({ success: true, user })
  })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  if(!email && !password) return res.status(400).json({ success: false })

  const hashed = await bcrypt.hash(password, 10)

  const q = 'INSERT INTO users(`email`, `password`) VALUES (?)'

  const values = [ email, hashed ]
  db.query(q, [values], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    return res.send({ success: true, message: 'Užívateľ vytvorený' })
  })
}

export const logout = (req, res) => {
  res.clearCookie('access-token', { sameSite: 'none', secure: true }).status(200).json({ success: true, message: 'Úspešné odhlásenie' })
}