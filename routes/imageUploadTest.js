import express from 'express'
import cloudinary from '../config/cloudinary.js'
import upload from '../config/multer.js'
import Image from '../models/imageUploadTestModel.js'

const router = express.Router()

const ImageTestRoute = router.post(
  '/',
  upload.single('image'),
  async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)
      // Create new Image
      let image = new Image({
        imageTitle: req.body.name,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
      })
      // save image details in mongodb
      await image.save()
      res.status(200).send({
        image,
      })
    } catch (err) {
      console.log(err)
    }
  }
)

export default ImageTestRoute
