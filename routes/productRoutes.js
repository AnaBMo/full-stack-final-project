// ---------------------------------------------------------------
// --------- Definición de rutas CRUD para los productos ---------
//    Las rutas de /products son públicas (sin autenticación)
// ---------------------------------------------------------------
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/expiring', productController.getExpiringSoonProduct);
router.get('/products/expired', productController.getExpiredProduct);
router.get('/products/:productId', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.removeProduct);

module.exports = router;