const express = require('express');
const cookieParser = require('cookie-parser'); // manejar el token req.cookies.token
require('dotenv').config(); 

const admin = require('./config/firebase'); // Firebase Admin SDK
const dbConnection = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const recipeRoutes = require("./routes/recipeRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', recipeRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

module.exports = app;