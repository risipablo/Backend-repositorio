const express = require ('express')
const ProductManager = require('./ProductManager.js')

const app = express();
const productManager = new ProductManager('products.json')

app.get('/products', async (req, res) => {
    try {
        await productManager.readProducts();

        let products = productManager.products;
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit)) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudieron cargar los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        await productManager.readProducts();

        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});