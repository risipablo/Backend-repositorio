


// Alumno: Pablo Risi
// Entrega desafió numero 3


    const fs = require('fs');

    class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(product) {
        const newProduct = {
        id: this.products.length + 1,
        ...product,
        };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async getProducts() {
        await this.readProducts();
        return this.products;
    }

    async getProductById(id) {
        await this.readProducts();
        return this.products.find((product) => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        await this.readProducts();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
        return null;
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(id) {
        await this.readProducts();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
        return null;
        }
        this.products.splice(productIndex, 1);
        await this.saveProducts();
        return true;
    }

    async readProducts() {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        } catch (error) {
        this.products = [];
        }
    }

    async saveProducts() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
    }

    module.exports = ProductManager;


    const productManager = new ProductManager('products.json');
    

    const product = {
    title: 'Gol Trend ',
    description: 'Modelo 2022',
    price: 100,
    thumbnail: '..',
    code: 1234,
    stock: 12,
    }

    const product2 = {
        title: 'Jepp Renegate ',
        description: 'Modelo 2021',
        price: 700,
        thumbnail: '..',
        code: 123,
        stock: 6,
        }
        
    
    productManager.addProduct(product);
    productManager.addProduct(product2)

    const products = productManager.getProducts();

    const productById = productManager.getProductById(1);

    productManager.updateProduct(1, { price: 150 });

    productManager.deleteProduct();
