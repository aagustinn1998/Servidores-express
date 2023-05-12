import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.load();
  }

  load() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const json = JSON.parse(data);
      this.products = json;
    } catch (error) {
      console.log('Error loading file', error);
    }
  }

  save() {
    try {
      const json = JSON.stringify(this.products);
      fs.writeFileSync(this.path, json, 'utf-8');
    } catch (error) {
      console.log('Error saving file', error);
    }
  }

  generateId() {
    return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
  }

  getProducts(limit = 10) {
    return this.products.slice(0, limit);
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(product) {
    const id = this.generateId();
    const newProduct = { ...product, id };
    this.products.push(newProduct);
    this.save();
    return newProduct;
  }
}

export default ProductManager;
