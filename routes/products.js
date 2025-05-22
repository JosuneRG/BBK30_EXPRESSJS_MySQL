const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// GET todos los productos
router.get('/', ProductController.getAll);

// Otros endpoints

// http://localhost:3000/products/desc
router.get('/desc', ProductController.getDesc);

// http://localhost:3000/products/:id
router.get('/:id', ProductController.getById);

// http://localhost:3000/products/name/:nameProduct
router.get('/name/:nameProduct', ProductController.getByName);

// http://localhost:3000/products
router.post('/', ProductController.addProduct);

// http://localhost:3000/products/:id
router.put('/:id', ProductController.update);

// http://localhost:3000/products/:id
router.delete('/:id', ProductController.delete);

// http://localhost:3000/products/create/table
router.get('/create/table', ProductController.createTable);

// Exporta correctamente el router
module.exports = router;
