import db from "../db.js"

export const author = (req, res) => {
  const q = 'SELECT * FROM author'

  try {
    db.query(q, (err, data) => {
      if(err) return res.status(400).json({ success: false, message: err }) 
  
      return res.status(200).json(data[0])
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}