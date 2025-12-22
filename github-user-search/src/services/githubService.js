import axios from 'axios';

// GitHub API base URL
const BASE_URL = 'https://api.github.com';

// Get GitHub token from environment variables (if exists)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Function to fetch user data
export const fetchUserData = async (username) => {
  try {
    // Set up headers
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authorization if token exists
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    // Make the API call
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers
    });

    // Return the user data
    return response.data;
  } catch (error) {
    // If user not found or any error, throw error
    throw new Error('User not found');
  }
};