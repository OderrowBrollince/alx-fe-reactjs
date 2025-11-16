import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context for Recipe Store
const RecipeContext = createContext();

// Recipe Store Provider Component
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([
    { 
      id: 1, 
      title: 'Spaghetti Carbonara', 
      description: 'Classic Italian pasta with eggs, cheese, and pancetta', 
      ingredients: 'pasta, eggs, cheese, pancetta', 
      prepTime: 30 
    },
    { 
      id: 2, 
      title: 'Chicken Stir Fry', 
      description: 'Quick and healthy Asian-inspired dish', 
      ingredients: 'chicken, vegetables, soy sauce', 
      prepTime: 20 
    },
    { 
      id: 3, 
      title: 'Chocolate Cake', 
      description: 'Rich and moist chocolate dessert', 
      ingredients: 'flour, cocoa, eggs, sugar', 
      prepTime: 60 
    }
  ]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Add a new recipe
  const addRecipe = (newRecipe) => {
    setRecipes(prev => [...prev, { ...newRecipe, id: Date.now() }]);
  };

  // Update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
  };

  // Delete a recipe
  const deleteRecipe = (recipeId) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    setFavorites(prev => prev.filter(id => id !== recipeId));
  };

  // Set recipes (for initialization)
  const setRecipesData = (recipesData) => {
    setRecipes(recipesData);
  };

  // Filter recipes based on search term
  const filterRecipes = () => {
    setFilteredRecipes(recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  // Add a recipe to favorites
  const addFavorite = (recipeId) => {
    setFavorites(prev => [...prev, recipeId]);
  };

  // Remove a recipe from favorites
  const removeFavorite = (recipeId) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  };

  // Generate personalized recommendations
  const generateRecommendations = () => {
    const recommended = recipes
      .filter(recipe => !favorites.includes(recipe.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setRecommendations(recommended);
  };

  // Auto-filter when search term or recipes change
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes]);

  const value = {
    recipes,
    favorites,
    searchTerm,
    filteredRecipes,
    recommendations,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    setRecipes: setRecipesData,
    setSearchTerm,
    filterRecipes,
    addFavorite,
    removeFavorite,
    generateRecommendations
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use recipe store
export const useRecipeStore = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeStore must be used within RecipeProvider');
  }
  return context;
};