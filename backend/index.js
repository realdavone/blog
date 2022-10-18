import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import dotenv from 'dotenv'

import postsRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))
app.use(express.json())

app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use('/images', express.static('uploads'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('image'), (req, res, next) => {
  const file = req.file
  res.json(file.filename)
})

app.listen(process.env.PORT || 5000, () => { console.log(`Listening at port ${process.env.PORT || 5000}`) })