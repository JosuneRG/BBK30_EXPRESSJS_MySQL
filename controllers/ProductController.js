// Importamos la conexión a la base de datos
const db = require('../config/database');

// Definimos el controlador de productos con sus métodos
const ProductController = {

  // Crea la tabla "Product" si no existe
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

  // Agrega un nuevo producto a la base de datos
  addProduct: (req, res) => {
    const { nameProdruct, price } = req.body;
    const sql = "INSERT INTO product (nameProdruct, price) VALUES (?, ?)";
    db.query(sql, [nameProdruct, price], (err, result) => {
      if (err) throw err;
      res.send("Producto añadido correctamente");
    });
  },

  // Obtiene todos los productos
  getAll: (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
      if (err) throw err;
      res.json(result); // Devuelve todos los productos en formato JSON
    });
  },

  // Obtiene un producto por su ID
  getById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM product WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.status(404).send("Producto no encontrado");
      res.json(result[0]); // Devuelve el producto encontrado
    });
  },

  // Obtiene un producto por su nombre
  getByName: (req, res) => {
    const { nameProduct } = req.params;
    const sql = "SELECT * FROM product WHERE nameProduct = ?";
    db.query(sql, [nameProduct], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.status(404).send("Producto no encontrado");
      res.json(result[0]); // Devuelve el producto encontrado
    });
  },

  // Actualiza un producto por ID
  update: (req, res) => {
    const { id } = req.params;
    const { nameProdruct, price } = req.body;

    let fields = [];
    let values = [];

    // Si se recibe un nuevo nombre, lo añadimos al array de campos
    if (nameProdruct) {
      fields.push("nameProdruct = ?");
      values.push(nameProdruct);
    }

    // Si se recibe un nuevo precio, lo añadimos
    if (price) {
      fields.push("price = ?");
      values.push(price);
    }

    // Si no hay nada que actualizar
    if (fields.length === 0) return res.status(400).send("Nada para actualizar");

    // Armamos la query dinámica de actualización
    const sql = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
      res.send("Producto actualizado correctamente");
    });
  },
  
  // Obtiene los productos ordenados por ID descendente
  getDesc: (req, res) => {
    const sql = 'SELECT * FROM product ORDER BY id DESC';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
  },
  
  // Elimina un producto por su ID
  delete: (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
      res.send("Producto eliminado correctamente");
    });
  }
};

// Exportamos el controlador para usarlo en las rutas
module.exports = ProductController;
