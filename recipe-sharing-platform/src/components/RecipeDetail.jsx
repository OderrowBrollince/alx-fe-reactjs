import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
  fetch('/src/data.json')
    .then(response => response.json())
    .then(data => {
      const foundRecipe = data.find(r => r.id === parseInt(id));
      setRecipe(foundRecipe);
    })
    .catch(error => console.error('Error loading recipe:', error));
}, [id]);


  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Recipe Hero Section */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {recipe.summary}
            </p>

            {/* Recipe Info */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 py-4 border-y border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Prep Time</p>
                <p className="text-gray-800 font-semibold">{recipe.prepTime}</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-gray-500 text-sm mb-1">Cook Time</p>
                <p className="text-gray-800 font-semibold">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Servings</p>
                <p className="text-gray-800 font-semibold">{recipe.servings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ingredients
              </h2>
              
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index}
                    className="flex items-start text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Instructions
              </h2>
              
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li 
                    key={index}
                    className="flex items-start group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 group-hover:bg-blue-700 transition-colors duration-200">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Back to Recipes Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Explore More Recipes
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2026 Recipe Sharing Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default RecipeDetail;