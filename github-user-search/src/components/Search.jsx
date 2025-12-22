import { useState } from 'react';
import { fetchUserDataAdvanced, searchUsers } from '../services/githubService';

const Search = () => {
  // State for input values
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  
  // State for search results (multiple users)
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  
  // State for single user data (detailed view)
  const [userData, setUserData] = useState(null);
  
  // State for loading status
  const [loading, setLoading] = useState(false);
  
  // State for error handling
  const [error, setError] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Handle form submission - Search multiple users
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setError(false);
    setUserData(null);
    setSearchResults([]);
    setLoading(true);
    setCurrentPage(1);

    try {
      // Call the search API with filters
      const data = await searchUsers(username, location, minRepos);
      
      if (data.total_count === 0) {
        setError(true);
      } else {
        setSearchResults(data.items);
        setTotalResults(data.total_count);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle viewing detailed user info
  const handleViewUser = async (login) => {
    setLoading(true);
    try {
      const data = await fetchUserDataAdvanced(login, '', '');
      setUserData(data);
      setSearchResults([]); // Hide search results when viewing single user
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to results
  const handleBackToResults = () => {
    setUserData(null);
  };

  // Reset form
  const handleReset = () => {
    setUsername('');
    setLocation('');
    setMinRepos('');
    setUserData(null);
    setSearchResults([]);
    setError(false);
    setCurrentPage(1);
    setTotalResults(0);
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            GitHub User Search
          </h1>
          <p className="text-gray-300">
            Search for GitHub users with advanced filters
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 mb-8">
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="e.g., octocat"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                aria-required="true"
              />
            </div>

            {/* Advanced Filters Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Field */}
                <div>
                  <label 
                    htmlFor="location" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g., Kenya"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Minimum Repositories Field */}
                <div>
                  <label 
                    htmlFor="minRepos" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Minimum Repositories
                  </label>
                  <input
                    id="minRepos"
                    type="number"
                    min="0"
                    placeholder="e.g., 10"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105"
              >
                Search
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg 
              className="mx-auto h-12 w-12 text-red-500 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p className="text-red-800 font-semibold text-lg">
              Looks like we cant find the user
            </p>
            <p className="text-red-600 mt-2">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Search Results - Multiple Users */}
        {searchResults.length > 0 && !loading && !userData && (
          <div className="space-y-4">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-700 font-medium">
                Found <span className="text-blue-600 font-bold">{totalResults}</span> users
              </p>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentResults.map((user) => (
                <div 
                  key={user.id} 
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <img 
                      src={user.avatar_url} 
                      alt={user.login}
                      className="w-20 h-20 rounded-full border-2 border-blue-500"
                    />
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {user.login}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        ID: {user.id}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                          </svg>
                          Repos
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewUser(user.login)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                        <a 
                          href={user.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition text-center"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Single User Detailed View */}
        {userData && !loading && !error && (
          <div className="space-y-4">
            {/* Back Button */}
            <button
              onClick={handleBackToResults}
              className="bg-white text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
            >
              ← Back to Results
            </button>

            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* User Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-center">
                <img 
                  src={userData.avatar_url} 
                  alt={userData.login}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold text-white mb-2">
                  {userData.name || userData.login}
                </h2>
                <p className="text-blue-100">@{userData.login}</p>
              </div>

              {/* User Details */}
              <div className="p-8">
                {userData.bio && (
                  <p className="text-gray-700 text-center mb-6 text-lg">
                    {userData.bio}
                  </p>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {userData.public_repos}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Repositories</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {userData.followers}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Followers</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {userData.following}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Following</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 mb-6">
                  {userData.location && (
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {userData.location}
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {userData.company}
                    </div>
                  )}
                  {userData.blog && (
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {userData.blog}
                      </a>
                    </div>
                  )}
                </div>

                {/* View Profile Button */}
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-900 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition transform hover:scale-105"
                >
                  View GitHub Profile →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;