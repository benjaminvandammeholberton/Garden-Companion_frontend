import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Fetches user information from the specified API endpoint.
 *
 * @returns {Promise<Object>} A promise that resolves to the user information.
 * @throws {Error} If the HTTP response status is not in the range 200-299.
 */
export async function getUserInfo() {
  try {
    const response = await fetch(`${BASE_URL}/users/info`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch user information: ${error.message}`);
  }
}
