// Import necessary dependencies
import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 
 */
export async function getAssistantAnswer(data) {
  // Make a POST request to
  const response = await fetch(`${BASE_URL}/assistant/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Handle the API response
  return handleResponse(response);
}
