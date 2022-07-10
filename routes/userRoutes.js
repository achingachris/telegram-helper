import express from 'express'

// controllers
import authUser from '../controllers/user/authUser.js'
import registerUser from '../controllers/user/registerUser.js'
import getUserProfile from '../controllers/user/getUserProfile.js'
import updateUserProfile from '../controllers/user/updateUserProfile.js'
import getUsers from '../controllers/user/getUsers.js'
import deleteUser from '../controllers/user/deleteUser.js'
import getUserById from '../controllers/user/getUserById.js'
import updateUser from '../controllers/user/updateUser.js'

const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
