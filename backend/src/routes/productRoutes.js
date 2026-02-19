const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { productValidator } = require('../validators/product.validator');
const validateRequest = require('../middlewares/validateRequest');

router.route('/')
    .get(getProducts)
    .post(productValidator, validateRequest, createProduct);

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
