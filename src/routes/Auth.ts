import express from 'express'
import controller from '../controllers/Auth.js'
import { checkAuth } from '../utils/checkAuth.js'
import { registerValidation } from '../validations/auth.js'

const router = express.Router()

// Registration
router.post('/register', registerValidation, controller.register)
// Register
router.post('/login', controller.login)
// Get Me
router.get('/me', checkAuth, controller.getMe)

export default router