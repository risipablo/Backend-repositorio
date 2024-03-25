


// Alumno: Pablo Risi
// Entrega desafió numero 2



const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            products.push(product);
            await this.saveProducts(products);
            return product.id;
        } catch (error) {
            throw new Error(`Error al añadir el producto : ${error.message}`);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, return an empty array
                return [];
            }
            throw new Error(`Error al leer el producto : ${error.message}`);
        }
    }

    
    
    async getProductById(id) {
        try {
            // Devuelve los productos con arreglos 
            const products = await this.getProducts(); 
            return products.find(product => product.id === id);
        } catch (error) {
            throw new Error(`Error con el id del producto : ${error.message}`);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error('producto no encontrado');
            }
            products[index] = { ...products[index], ...updatedFields };
            await this.saveProducts(products);
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
        } catch (error) {
            throw new Error(`Error al eliminar el producto : ${error.message}`);
        }
    }

    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
}


const productManager = new ProductManager('products.json');


(async () => {
    try {

        const productId = await productManager.addProduct({
            title: 'Gol trend',
            description: 'Modelo 2022 ',
            price: 2500,
            thumbnail: 'thumbnail1.jpg',
            code: '1234',
            stock: 20
        });
        console.log('Product added with ID:', productId);

        const products = await productManager.getProducts();
        console.log('Todos los productos :', products);

        const productToUpdate = await productManager.getProductById(productId);
        if (productToUpdate) {
            await productManager.updateProduct(productId, { price: 15, stock: 90 });
            console.log('Producto agregado correctamente');
        }

        await productManager.deleteProduct(productId);
        console.log('Producto eleminado correctamente');
    } catch (error) {
        console.error(error);
    }
})();
