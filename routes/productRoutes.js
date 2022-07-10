import express from 'express'
const router = express.Router()

// controllers
import getProducts from '../controllers/products/getProducts.js'
import getProductById from '../controllers/products/getProductById.js'
import deleteProduct from '../controllers/products/deleteProduct.js'
import createProduct from '../controllers/products/createProduct.js'
import updateProduct from '../controllers/products/updateProduct.js'
import createProductReview from '../controllers/products/createProductReview.js'
import getTopProducts from '../controllers/products/getTopProducts.js'


import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
