const express = require('express');
const router = express.Router();
const {getProducts,addProduct,getProductById,deleteProduct, updateProduct} = require('../controllers/product.controller');

router.get('/allProducts',getProducts);
router.post('/addProduct',addProduct);
router.get('/product/:id',getProductById);
router.delete('/deleteProduct/:id',deleteProduct);
router.put('/updateProduct/:id',updateProduct);

module.exports = router