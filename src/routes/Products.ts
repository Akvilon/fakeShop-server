import express from 'express'
import controller from '../controllers/Products.js'

const router = express.Router()

router.get('/products', controller.getProducts)

export default router;