const express = require('express');
const router = express.Router();

// Require the Product controller
const productController = require("../controllers/ProductController.js");

// Define routes for CRUD operations

// Get all products
router.get('/', productController.list);

// Get single product by id
router.get('/show/:id', productController.show);

// Create product
router.get('/create', productController.create);

// Save product
router.post('/save', productController.save);

// Edit product
router.get('/edit/:id', productController.edit);

// Update product
router.post('/update/:id', productController.update);

// Delete product
router.post('/delete/:id', productController.delete);

// Export router as a module
module.exports = router;
