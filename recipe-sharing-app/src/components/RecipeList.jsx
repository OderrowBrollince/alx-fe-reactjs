import React from 'react';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recipe List</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes available.</p>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;