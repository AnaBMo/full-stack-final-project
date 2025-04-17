// ---------------------------------------------------------------
// ------- Definición de rutas CRUD para las elaboraciones -------
//    Las rutas de /recipes están protegidas (con autenticación)
// ---------------------------------------------------------------
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/recipes", authMiddleware, recipeController.createRecipe);
router.get("/recipes", authMiddleware, recipeController.getAllRecipes);
router.get("/recipes/date/:date", authMiddleware, recipeController.filterByPreparationDate);
router.get("/recipes/:recipeId", authMiddleware, recipeController.getRecipeById);

/* 
// Sin autenticación para realizar las pruebas con Postman
router.post("/recipes", recipeController.createRecipe);
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/date/:date", recipeController.filterByPreparationDate);
router.get("/recipes/:recipeId", recipeController.getRecipeById);
*/

module.exports = router;