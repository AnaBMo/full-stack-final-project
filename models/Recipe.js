// ---------------------------------------------------------------
// ----------- Definición del esquema de la elaboración ----------
// ---------------------------------------------------------------
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"]
  },
  ingredients: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // referencia al modelo Product
                        // se puede usar .populate() para ver detalles del producto
        required: true
      }
    }
  ],
  preparationDate: {
    type: Date,
    required: [true, "Preparation date is required"]
  },
  expirationDate: {
    type: Date,
    required: [true, "Expiration date is required"]
  },
  createdBy: {
    type: String, // UID del usuario de Firebase
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);