import db from "../db.js"

export const allPosts = (req, res) => {
  const q = 'SELECT u.email as author, `title`, `content`, `img`, `published`, p.id FROM posts p JOIN users u ON u.id=p.uid ORDER BY published DESC LIMIT 5'

  db.query(q, (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    if(data.length === 0) return res.status(404).json({ success: false, message: 'Nenájdené' })

    return res.status(200).json(data)
  })
} 

export const newPost = (req, res) => {
  const q = 'INSERT INTO posts(`title`, `content`, `category`, `uid`, `img`) VALUES (?)'

  const values = [ req.body.title, req.body.content, req.body.category, 1, req.body.img ]

  db.query(q, [values], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    res.status(200).json({ success: true })
  })
}

export const getPost = (req, res) => {
  const q = 'SELECT u.email as author, u.id as userid, `title`, `content`, `img`, `published`, `category`, p.id FROM posts p JOIN users u ON u.id=p.uid WHERE p.id = ?'

  db.query(q, [req.params.id], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    if(data.length === 0) return res.status(404).json({ success: false, message: 'Nenájdené' })

    const { author, userid, ...rest } = data[0]

    res.status(200).json({ author: { email: author, id: userid }, ...rest })
  })
}

export const removePost = (req, res) => {
  const q = 'DELETE FROM `posts` WHERE `posts`.`id` = ?'

  db.query(q, [req.params.id], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    res.status(200).json({ success: true, message: 'Post vymazaný' })
  }) 
}

export const editPost = (req, res) => {
  const q = 'UPDATE posts SET `title`=?,`content`=?,`category`=? WHERE `id`=? and `uid`=?'

  db.query(q, [req.body.title, req.body.content, req.body.category, req.params.id, 1], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    res.status(200).json({ success: true, message: 'Post upravený' })
  })
}

export const getCategory = (req, res) => {
  const q = 'SELECT u.email as author, `title`, `content`, `img`, `published`, p.id FROM posts p JOIN users u ON u.id=p.uid WHERE p.category=? ORDER BY published DESC LIMIT 5'

  db.query(q, [req.params.category], (err, data) => {
    if(err) return res.status(400).json({ success: false, message: err })

    if(data.length === 0) return res.status(404).json({ success: false, message: 'Nenájdené' })
  
    res.status(200).json(data)
  })
}