// Import necessary dependencies
import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Fetches vegetable manager from the API.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue fetching vegetable manager.
 */
export async function getVegetableManager() {
  // Make a GET request to fetch vegetable manager
  const response = await fetch(`${BASE_URL}/vegetable_manager/`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Creates a new vegetable manager for the current user.
 * @param {Object} data - The data for creating a new vegetable manager.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue creating the vegetable manager.
 */
export async function createVegetableManager(data) {
  // Make a POST request to create a new vegetable manager
  const response = await fetch(`${BASE_URL}/vegetable_manager/create`, {
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

/**
 * Retrieves a vegetable manager by its ID.
 * @param {number} vegetableManagerId - The ID of the vegetable manager to retrieve.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue retrieving the vegetable manager.
 */
export async function getVegetableManagerById(vegetableManagerId) {
  // Make a GET request to retrieve a vegetable manager by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_manager/${vegetableManagerId}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  );

  // Handle the API response
  return handleResponse(response);
}

/**
 * Updates a vegetable manager by its ID.
 * @param {number} vegetableManagerId - The ID of the vegetable manager to update.
 * @param {Object} data - The data for updating the vegetable manager.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue updating the vegetable manager.
 */
export async function updateVegetableManagerById(vegetableManagerId, data) {
  // Make a PUT request to update a vegetable manager by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_manager/${vegetableManagerId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  // Handle the API response
  return handleResponse(response);
}

/**
 * Deletes a vegetable manager by its ID.
 * @param {number} vegetableManagerId - The ID of the vegetable manager to delete.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue deleting the vegetable manager.
 */
export async function deleteVegetableManagerById(vegetableManagerId) {
  // Make a DELETE request to delete a vegetable manager by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_manager/${vegetableManagerId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        Accept: 'application/json',
      },
    }
  );

  // Handle the API response
  return handleResponse(response);
}
