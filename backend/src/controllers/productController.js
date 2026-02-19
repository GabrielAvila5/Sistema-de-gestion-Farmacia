const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, description, sku, price, stock, category, expiryDate } = req.body;

        const productExists = await Product.findOne({ sku });

        if (productExists) {
            res.status(400);
            throw new Error('Product already exists');
        }

        const product = await Product.create({
            name,
            description,
            sku,
            price,
            stock,
            category,
            expiryDate,
        });

        if (product) {
            res.status(201).json(product);
        } else {
            res.status(400);
            throw new Error('Invalid product data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, category, expiryDate } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price !== undefined ? price : product.price;
            product.stock = stock !== undefined ? stock : product.stock;
            product.category = category || product.category;
            product.expiryDate = expiryDate || product.expiryDate;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
