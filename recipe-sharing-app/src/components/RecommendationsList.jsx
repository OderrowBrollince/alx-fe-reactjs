import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
        <button
          onClick={generateRecommendations}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Refresh
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <p className="text-gray-500">No recommendations available. Add some favorites first!</p>
      ) : (
        <div className="space-y-4">
          {recommendations.map(recipe => (
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

export default RecommendationsList;