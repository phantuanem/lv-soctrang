const express = require('express')
const categoryController = require('../../controllers/admin-controllers/category')
const productController = require('../../controllers/admin-controllers/product')
const usercontroller = require('../../controllers/admin-controllers/user')
const router = express.Router()

router.get('/category-and-supplier', categoryController.getCategoryAndSupplier)
router.get('/product', productController.getAllProduct)
router.get('/category', categoryController.getAllCategory)
router.get('/users', usercontroller.getAllUser)
router.post('/product', productController.createProduct)
module.exports = router