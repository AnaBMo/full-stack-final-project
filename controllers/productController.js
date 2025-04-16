const productModel = require("../models/Product");

const productController = {
  // 1. Obtener todos los productos
  async getAllProducts(req, res) {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('❌ Error getting products:', error);
      res.status(500).json({ error: 'Error getting products' });
    }
  },

  // 2. Obtener un producto por ID
  async getProductById(req, res) {
    try {
      const product = await productModel.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('❌ Error getting the product:', error);
      res.status(500).json({ error: 'Error getting the product' });
    }
  },

  // 3. Crear un nuevo producto
  async createProduct(req, res) {
    try {
      const newProduct = await productModel.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('❌ Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    }
  },

  // 4. Actualizar un producto
  async updateProduct(req, res) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('❌ Error updating the product:', error);
      res.status(500).json({ error: 'Error updating the product' });
    }
  },

  // 5. Eliminar un producto
  async removeProduct(req, res) {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(req.params.productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product successfully removed' });
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  },

  // 6. Obtener productos que caducan pronto (7 días)
  async getExpiringSoonProduct(req, res) {
    try {
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);

      console.log("🕓 Hoy:", today.toISOString());
      console.log("🗓️ En 7 días:", sevenDaysFromNow.toISOString());

      const expiringProducts = await productModel.find({
        expirationDate: {
            // usamos operadores MongoDB porque el filtrado con JS puro afecta al rendimiento
            $gte: today,           // "greater than or equal"
            $lte: sevenDaysFromNow // "less than or equal" 
        }
      });

      console.log("🔍 Productos próximos a caducar:", expiringProducts.length);

      res.status(200).json(expiringProducts);
    } catch (error) {
      console.error('❌ Error getting products close to expiration:', error);
      res.status(500).json({ error: 'Error getting products close to expiration:' });
    }
  },

  // 7. Obtener productos ya caducados
  async getExpiredProduct(req, res) {
    try {
      const today = new Date();

      const expiredProducts = await productModel.find({
        expirationDate: { $lt: today } // operador MongoDB "less than"
      });

      console.log("⚠️ Productos caducados:", expiredProducts.length);
      
      res.status(200).json(expiredProducts);
    } catch (error) {
      console.error('❌ Error getting expired products:', error);
      res.status(500).json({ error: 'Error getting expired products:' });
    }
  }
};

module.exports = productController;