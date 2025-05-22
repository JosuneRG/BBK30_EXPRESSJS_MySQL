const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Crear tabla
// http://localhost:3000/categories/create
router.get('/create', CategoryController.createTable);

// CRUD
// http://localhost:3000/categories/addCategory
router.post('/addCategory', CategoryController.addCategory);

// http://localhost:3000/categories/updateCategory/:id
router.put('/updateCategory/:id', CategoryController.update);

// http://localhost:3000/categories/showCategory
router.get('/showCategory', CategoryController.getAll);

// http://localhost:3000/categories/showCategoryBy_id/id/:id
router.get('/showCategoryBy_id/id/:id', CategoryController.getById);

// Exporta correctamente el router
module.exports = router;
