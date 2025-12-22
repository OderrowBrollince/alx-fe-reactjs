import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  // State for input value
  const [username, setUsername] = useState('');
  
  // State for user data from API
  const [userData, setUserData] = useState(null);
  
  // State for loading status
  const [loading, setLoading] = useState(false);
  
  // State for error handling
  const [error, setError] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Reset previous states
    setError(false);
    setUserData(null);
    setLoading(true);

    try {
      // Call the API
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional Rendering Based on State */}
      {loading && <p>Loading...</p>}
      
      {error && <p>Looks like we cant find the user</p>}
      
      {userData && !loading && !error && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
