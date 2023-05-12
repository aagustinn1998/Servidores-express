import express from 'express';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./products.json');

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Obtener todos los productos
app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Obtener los primeros productos, predeterminado 10
app.get('/products', (req, res) => {
  const limit = req.query.limit || 10;  
  const products = productManager.getProducts(limit);
  res.json(products);
});

// Obtener el producto por el id, error 404 producto no encontrado 
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = productManager.getProductById(productId);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    res.json(product);
  }
});