import React from 'react';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );

  if (!recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      <p className="text-gray-700 mb-6">{recipe.description}</p>
      
      {recipe.ingredients && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
          <p className="text-gray-600">{recipe.ingredients}</p>
        </div>
      )}
      
      {recipe.prepTime && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Preparation Time:</h3>
          <p className="text-gray-600">⏱️ {recipe.prepTime} minutes</p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;