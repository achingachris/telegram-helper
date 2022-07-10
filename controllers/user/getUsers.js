import asyncHandler from 'express-async-handler'
import generateToken from '../../utils/generateToken.js'
import User from '../../models/User.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export default getUsers
