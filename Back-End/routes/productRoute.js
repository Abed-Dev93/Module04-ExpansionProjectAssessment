import express from 'express'
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productsController.js'
import { verifyToken, authorizedUser } from '../middlewares/auth.js'

const productRouter = express.Router()

productRouter.post('/create', verifyToken, authorizedUser, createProduct)
productRouter.get('/read', getAllProducts)
productRouter.get('/read/:id', getProductById)
productRouter.patch('/update/:id', verifyToken, authorizedUser, updateProduct)
productRouter.delete('/delete/:id', verifyToken, authorizedUser, deleteProduct)

export default productRouter