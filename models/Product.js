// ---------------------------------------------------------------
// ------------- Definición del esquema del producto -------------
// ---------------------------------------------------------------
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    entryDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expirationDate: {
        type: Date,
        required: true,
      },
    batchNumber: {
      type: String,
      required: true,
    },
    deliveryNoteNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: [200, 'The description must have a maximum of 200 characters'],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;