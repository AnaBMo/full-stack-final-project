// --------------------------------------------------------------
// ------------- Definición del esquema del usuario -------------
// --------------------------------------------------------------
/*
 ⚠️ Este modelo no se está usando actualmente, pero se conserva 
 por si se necesitan datos personalizados de usuarios en el futuro.
*/
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);