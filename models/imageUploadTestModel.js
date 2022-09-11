import mongoose from 'mongoose'

const ImageSchema = mongoose.Schema({
  imageTitle: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
})

const Image = mongoose.model('Image', ImageSchema)
export default Image
