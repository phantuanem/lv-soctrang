const express = require('express')
const productController = require('../../controllers/customer-controllers/product')
const categoryController = require('../../controllers/customer-controllers/category')
const registerController = require('../../controllers/customer-controllers/register')
const loginController = require('../../controllers/customer-controllers/login')
const cartController = require('../../controllers/customer-controllers/cart')
const customerController = require('../../controllers/customer-controllers/customer')

const router = express.Router()

router.get('/products', productController.getAllProduct)
router.get('/product', productController.getProduct)
router.get('/categorys', categoryController.getCategorys)
router.get('/products-home', categoryController.getProductsHome)
router.get('/products/category', productController.getProductOfCatetory)
router.get('/login', loginController.authenUser)
router.get('/cart/items', cartController.getAllItem)
router.get('/cart/sum', cartController.sumItemCart)
router.get('/customer', customerController.getCustomerInfo)

router.post('/login', loginController.handleLogin)
router.post('/users', registerController.createUser)
router.post('/cart/add', cartController.addToCart)

router.put('/address', customerController.updateAddress)
router.put('/customer', customerController.updateCustomer)

router.delete('/cart/item', cartController.removeItem)

module.exports = router