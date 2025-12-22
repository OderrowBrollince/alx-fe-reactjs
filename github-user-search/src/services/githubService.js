import axios from 'axios';

// GitHub API base URL
const BASE_URL = 'https://api.github.com';

// Get GitHub token from environment variables (if exists)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Helper function to get headers
const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  // Add authorization if token exists
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  return headers;
};

// Function to fetch user data by username (original function)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: getHeaders()
    });

    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

// Advanced search function with filters
export const searchUsers = async (username, location = '', minRepos = '') => {
  try {
    // Build the search query
    let query = username;

    // Add location filter if provided
    if (location) {
      query += `+location:${location}`;
    }

    // Add minimum repositories filter if provided
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }

    // Make the API call to GitHub Search API
    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`, {
      headers: getHeaders()
    });

    // Return the search results
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};

// Function to fetch detailed user data from search results
export const fetchUserDataAdvanced = async (username, location = '', minRepos = '') => {
  try {
    // First, use the search API to find users matching criteria
    const searchResults = await searchUsers(username, location, minRepos);

    // If no users found, throw error
    if (searchResults.total_count === 0) {
      throw new Error('User not found');
    }

    // Get the first matching user's detailed information
    const firstUser = searchResults.items[0];
    
    // Fetch complete user details using the user's login
    const response = await axios.get(`${BASE_URL}/users/${firstUser.login}`, {
      headers: getHeaders()
    });

    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};