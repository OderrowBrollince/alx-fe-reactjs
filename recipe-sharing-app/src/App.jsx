import React from 'react';
import { RecipeProvider } from './recipeStore';
import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import RecommendationsList from './RecommendationsList';

const App = () => {
  return (
    <RecipeProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-2">🍳 Recipe Sharing App</h1>
            <p className="text-blue-100">Discover, Share, and Save Your Favorite Recipes</p>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Add Recipe Form */}
            <div className="lg:col-span-1">
              <AddRecipeForm />
            </div>

            {/* Right Column - Recipe List with Search */}
            <div className="lg:col-span-2">
              <SearchBar />
              <RecipeList />
              
              <div className="mt-8">
                <FavoritesList />
              </div>
              
              <div className="mt-8">
                <RecommendationsList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </RecipeProvider>
  );
};

export default App;



/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App 
*/
