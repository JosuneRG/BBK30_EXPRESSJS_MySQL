const db = require('../config/database');

const CategoryController = {
  createTable: (req, res) => {
    const sql = `CREATE TABLE category (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nameCategory VARCHAR(255) NOT NULL
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Tabla de categorías creada.");
    });
  },

  addCategory: (req, res) => {
    const { nameCategory } = req.body;
    const sql = "INSERT INTO category (nameCategory) VALUES (?)";
    db.query(sql, [nameCategory], (err, result) => {
      if (err) throw err;
      res.send("Categoría añadida correctamente");
    });
  },

  getAll: (req, res) => {
    db.query("SELECT * FROM category", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM category WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.status(404).send("Categoría no encontrada");
      res.json(result[0]);
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { nameCategory } = req.body;
    const sql = "UPDATE category SET nameCategory = ? WHERE id = ?";
    db.query(sql, [nameCategory, id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) return res.status(404).send("Categoría no encontrada");
      res.send("Categoría actualizada correctamente");
    });
  }
};

module.exports = CategoryController;
