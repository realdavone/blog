import express from 'express'
import { auth } from '../middleware/auth.js'
import { allPosts, getPost, newPost, removePost, editPost, getCategory } from '../controllers/posts.js'

const router = express.Router()

router.get('/', allPosts)
router.post('/new', auth, newPost)
router.get('/:id', getPost)
router.delete('/:id', auth, removePost)
router.put('/:id', auth, editPost)
router.get('/categories/:category', getCategory)

export default router