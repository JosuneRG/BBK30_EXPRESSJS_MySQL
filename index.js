const express = require("express");
const app = express();
const port = 3000;

// Rutas
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const setupRoutes = require('./routes/setup');

app.use(express.json());

// Usar rutas
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/setup', setupRoutes);

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
