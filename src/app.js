import express from 'express';
import ProductManager from './ProductManager.js';
const express = require('express');
const fs = require('fs');

const rawData = fs.readFileSync('products.json');
const products = JSON.parse(rawData);

const productManager = new ProductManager('./products.json');


const app = express();
const PORT = 8080;


// Obtener todos los productos
app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Obtener los primeros productos, predeterminado 10
app.get('/products/limit', (req, res) => {
  const limit = req.query.limit || 10;  
  const products = productManager.getProducts(limit);
  res.json(products);
});

//obtener los pimeros 5 productos 
app.get('/products/limit=5', (req, res) => {
  const limit = req.query.limit || 5;  
  const products = productManager.getProducts(limit);
  res.json(products);
});

//busqueda según id
app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = products.find(p => p.id == pid);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  return res.json(product);
}); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});