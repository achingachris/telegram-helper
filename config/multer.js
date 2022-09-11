import multer from 'multer'
import path from 'path'

// const multer = require('multer')
// const path = require('path')
// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('Unsupported file type!'), false)
      return
    }
    cb(null, true)
  },
})

export default upload
