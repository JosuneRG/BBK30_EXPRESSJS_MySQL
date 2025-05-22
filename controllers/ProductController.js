const db = require('../config/database');

const ProductController = {
  createTable: (req, res) => {
    const sql = `CREATE TABLE Product (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nameProdruct VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Tabla de productos creada.");
    });
  },

  addProduct: (req, res) => {
    const { nameProdruct, price } = req.body;
    const sql = "INSERT INTO product (nameProdruct, price) VALUES (?, ?)";
    db.query(sql, [nameProdruct, price], (err, result) => {
      if (err) throw err;
      res.send("Producto añadido correctamente");
    });
  },

  getAll: (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM product WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.status(404).send("Producto no encontrado");
      res.json(result[0]);
    });
  },

  getByName: (req, res) => {
    const { nameProduct } = req.params;
    const sql = "SELECT * FROM product WHERE nameProduct = ?";
    db.query(sql, [nameProduct], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.status(404).send("Producto no encontrado");
      res.json(result[0]);
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { nameProdruct, price } = req.body;

    let fields = [];
    let values = [];

    if (nameProdruct) {
      fields.push("nameProdruct = ?");
      values.push(nameProdruct);
    }

    if (price) {
      fields.push("price = ?");
      values.push(price);
    }

    if (fields.length === 0) return res.status(400).send("Nada para actualizar");

    const sql = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
      res.send("Producto actualizado correctamente");
    });
  },
  
  getDesc: (req, res) => {
    const sql = 'SELECT * FROM product ORDER BY id DESC';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
  },
  
  delete: (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
      res.send("Producto eliminado correctamente");
    });
  }
};

module.exports = ProductController;
