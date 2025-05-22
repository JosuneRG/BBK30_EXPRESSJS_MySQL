const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Crear tabla
router.get('/create', ProductController.createTable);

// CRUD
router.post('/addProduct', ProductController.addProduct);
router.put('/updateProduct/:id', ProductController.update);
router.get('/showProduct', ProductController.getAll);
router.get('/showProductBy_id/id/:id', ProductController.getById);
router.get('/showProductDesc', ProductController.getDesc);
router.get('/showProductName/nameProduct/:nameProduct', ProductController.getByName);
router.delete('/deleteProductBy_id/id/:id', ProductController.delete);