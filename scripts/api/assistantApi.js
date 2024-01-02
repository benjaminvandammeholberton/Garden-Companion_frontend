import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Sends a POST request to the assistant endpoint to get an answer.
 *
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 * @throws {Error} - If there's an error during the API request.
 */
export async function getAssistantAnswer(data) {
  try {
    const response = await fetch(`${BASE_URL}/assistant/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 */
export async function getNumberOfRequestsAllowed() {
  try {
    const response = await fetch(`${BASE_URL}/assistant/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error);
  }
}
