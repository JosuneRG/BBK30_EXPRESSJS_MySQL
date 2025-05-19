const express = require("express");
const app = express();
const mysql = require('mysql2');
const port = 3000;

app.use(express.json());

//Creamos la conexión a BBDD
const db = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'root',
database: 'shop'
});

//Conexion establecida
db.connect();

//Creamos la BBDD
app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE shop'
    
    db.query(sql, (err, result) => {
        
        if (err) throw err
            console.log(result)
        
            res.send('Database created...')
    });

});

// Iniciamos el servidor
app.listen(port, ()=>{
   console.log(`Servidor iniciado en el puerto ${port}`);
});

//Creamos la tabla Producto
app.get('/createTableProduct', (req, res) => {
    const sql =
    ' CREATE TABLE Product (id INT AUTO_INCREMENT PRIMARY KEY, nameProdruct VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL)'
    
    db.query(sql, (err, result) => {

        if (err) throw err
            console.log(result)

        res.send('Tabla de productos creada.')
    });
});

//Creamos la tabla Categoria
app.get('/createTableCategory', (req, res) => {
    const sql =
    ' CREATE TABLE category (id INT AUTO_INCREMENT PRIMARY KEY, nameCategory VARCHAR(255) NOT NULL)'
    
    db.query(sql, (err, result) => {

        if (err) throw err
            console.log(result)

        res.send('Tabla de categoria creada.')
    });
});

// Tabla intermedia (muchos a muchos)
app.get('/createTableProductCategories', (req, res) => {
    const sql = `
    CREATE TABLE product_categories (
        product_id INT,
        category_id INT,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (category_id) REFERENCES category(id)
    )
    `;
    
    db.query(sql, (err, result) => {
        
        if (err) throw err;
            res.send('Tabla productos-categoria creada');
    });
    
});

