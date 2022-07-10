import express from 'express'
const router = express.Router()

// controllers
import addOrderItems from '../controllers/orders/addOrderItems.js'
import getOrderById from '../controllers/orders/getOrderById.js'
import updateOrderToPaid from '../controllers/orders/updateOrderToPaid.js'
import updateOrderToDelivered from '../controllers/orders/updateOrderToDelivered.js'
import getMyOrders from '../controllers/orders/getMyOrders.js'
import getOrders from '../controllers/orders/getOrders.js'


import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
