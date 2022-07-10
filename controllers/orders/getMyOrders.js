import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel.js'

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export default getMyOrders
