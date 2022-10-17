import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

import postsRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

const app = express()

app.use(cookieParser())
app.use(cors({ credentials: true, origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] }))
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

app.listen(5000, () => {
  console.log(`Listening at port 5000`)
})