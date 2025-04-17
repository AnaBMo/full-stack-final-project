const recipeModel = require("../models/Recipe");

const recipeController = {
  // 1. Crear una receta
  async createRecipe(req, res) {
    try {
      const { name, ingredients, preparationDate, expirationDate } = req.body;

      if (!name || !ingredients || !preparationDate || !expirationDate) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newRecipe = await recipeModel.create({
        name,
        ingredients,
        preparationDate,
        expirationDate,
        createdBy: req.body.createdBy || "test-user"
      });

      res.status(201).json(newRecipe);
    } catch (error) {
      console.error("❌ Error creating recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // 2. Obtener todas las recetas
  async getAllRecipes(req, res) {
    try {
      const recipes = await recipeModel.find().populate("ingredients.product");
      res.status(200).json(recipes);
    } catch (error) {
      console.error("❌ Error fetching all recipes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // 3. Obtener receta por ID
  async getRecipeById(req, res) {
    try {
      const recipe = await recipeModel.findById(req.params.recipeId)
        .populate("ingredients.product");

      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.error("❌ Error fetching recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // 4. Filtrar recetas por fecha de elaboración
  async filterByPreparationDate(req, res) {
    try {
      const { date } = req.params;
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const recipes = await recipeModel.find({
        preparationDate: { $gte: start, $lte: end }
      }).populate("ingredients.product");

      res.status(200).json(recipes);
    } catch (error) {
      console.error("❌ Error filtering by preparation date:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = recipeController;