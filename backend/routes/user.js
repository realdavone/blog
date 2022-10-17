import express from 'express'

import { author } from '../controllers/user.js'

const router = express.Router()

router.get('/author', author)

export default router