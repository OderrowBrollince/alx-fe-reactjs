// src/services/githubApi.jsx

// Access the environment variable
const API_KEY = import.meta.env.VITE_GITHUB_TOKEN;

// Use it in your API calls
export const fetchGitHubData = async (username) => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  // Add authorization if API key exists
  if (API_KEY) {
    headers['Authorization'] = `token ${API_KEY}`;
  }
  
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};