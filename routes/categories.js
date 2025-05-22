const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Crear tabla
router.get('/create', CategoryController.createTable);

// CRUD
router.post('/addCategory', CategoryController.addCategory);
router.put('/updateCategory/:id', CategoryController.update);
router.get('/showCategory', CategoryController.getAll);
router.get('/showCategoryBy_id/id/:id', CategoryController.getById);

module.exports = router;
