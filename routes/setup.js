const express = require('express');
const router = express.Router();
const db = require('../config/database');

//Ruta Get: http://localhost:3000/create
router.get('/createTableProductCategories', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS product_categories (
            product_id INT,
            category_id INT,
            PRIMARY KEY (product_id, category_id),
            FOREIGN KEY (product_id) REFERENCES product(id),
            FOREIGN KEY (category_id) REFERENCES category(id)
        )
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Tabla productos-categorías creada.');
    });
});

module.exports = router;