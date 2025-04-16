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

/*

    Método	  |       Ruta	             |        Controlador
GET	          |  /products	             |     getAllProducts
GET           |  /products/expiring      |     getExpiringSoonProduct
GET           |  /products/expired	     |     getExpiredProduct
GET           |  /products/:productId	 |     getProductById
POST          |  /products	             |     createProduct
PUT           |  /products/:productId	 |     updateProduct
DELETE        |  /products/:productId	 |     removeProduct

*/