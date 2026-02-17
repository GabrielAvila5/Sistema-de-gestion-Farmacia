const { body } = require('express-validator');

const productValidator = [
    body('name', 'Product name is required').not().isEmpty(),
    body('sku', 'SKU is required').not().isEmpty(),
    body('price', 'Price must be a positive number').isFloat({ min: 0 }),
    body('stock', 'Stock must be a positive integer').isInt({ min: 0 }),
    body('category', 'Category is required').not().isEmpty(),
];

module.exports = {
    productValidator,
};
