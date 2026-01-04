import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  fetch('/src/data.json')
    .then(response => response.json())
    .then(data => setRecipes(data))
    .catch(error => console.error('Error loading recipes:', error));
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Recipe Sharing Platform
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Discover and share amazing recipes from around the world
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Recipe Image */}
              <div className="overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {recipe.summary}
                </p>

                {/* View Details Button */}
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out">
                  View Recipe
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading recipes...</p>
          </div>
        )}
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

export default HomePage;