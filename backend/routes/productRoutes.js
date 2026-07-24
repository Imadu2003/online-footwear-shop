const express = require('express');
const router = express.Router();
const {getProducts,getProductById} = require('../controllers/productController');
const {createProduct} = require('../controllers/productController');

router.get('/',getProducts);
router.post('/',createProduct);
router.get('/:id', getProductById);

module.exports = router;