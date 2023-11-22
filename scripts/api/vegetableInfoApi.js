// Import necessary dependencies
import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Fetches vegetable info from the API.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue fetching vegetable info.
 */
export async function getVegetableInfo() {
  // Make a GET request to fetch vegetable info
  const response = await fetch(`${BASE_URL}/vegetable_info/`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Creates a new vegetable info for the current user.
 * @param {Object} data - The data for creating a new vegetable info.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue creating the vegetable info.
 */
export async function createVegetableInfo(data) {
  // Make a POST request to create a new vegetable info
  const response = await fetch(`${BASE_URL}/vegetable_info/create`, {
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
 * Retrieves a vegetable info by its ID.
 * @param {number} vegetableInfoId - The ID of the vegetable info to retrieve.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue retrieving the vegetable info.
 */
export async function getVegetableInfoById(vegetableInfoId) {
  // Make a GET request to retrieve a vegetable info by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_info/${vegetableInfoId}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  );

  // Handle the API response
  return handleResponse(response);
}

/**
 * Updates a vegetable info by its ID.
 * @param {number} vegetableInfoId - The ID of the vegetable info to update.
 * @param {Object} data - The data for updating the vegetable info.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue updating the vegetable info.
 */
export async function updateVegetableInfoById(vegetableInfoId, data) {
  // Make a PUT request to update a vegetable info by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_info/${vegetableInfoId}`,
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
 * Deletes a vegetable info by its ID.
 * @param {number} vegetableInfoId - The ID of the vegetable info to delete.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue deleting the vegetable info.
 */
export async function deleteVegetableInfoById(vegetableInfoId) {
  // Make a DELETE request to delete a vegetable info by its ID
  const response = await fetch(
    `${BASE_URL}/vegetable_info/${vegetableInfoId}`,
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
