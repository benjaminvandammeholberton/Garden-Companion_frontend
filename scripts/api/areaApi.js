// Import necessary dependencies
import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Fetches areas for the current user.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue fetching areas.
 */
export async function getAreas() {
  // Make a GET request to fetch areas
  const response = await fetch(`${BASE_URL}/area/`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Creates a new area for the current user.
 * @param {Object} data - The data for creating a new area.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue creating the area.
 */
export async function createArea(data) {
  // Make a POST request to create a new area
  const response = await fetch(`${BASE_URL}/area/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Retrieves an area by its ID.
 * @param {number} areaId - The ID of the area to retrieve.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue retrieving the area.
 */
export async function getAreaById(areaId) {
  // Make a GET request to retrieve an area by its ID
  const response = await fetch(`${BASE_URL}/area/${areaId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Updates an area by its ID.
 * @param {number} areaId - The ID of the area to update.
 * @param {Object} data - The data for updating the area.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue updating the area.
 */
export async function updateAreaById(areaId, data) {
  // Make a PUT request to update an area by its ID
  const response = await fetch(`${BASE_URL}/area/${areaId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Deletes an area by its ID.
 * @param {number} areaId - The ID of the area to delete.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue deleting the area.
 */
export async function deleteAreaById(areaId) {
  // Make a DELETE request to delete an area by its ID
  const response = await fetch(`${BASE_URL}/area/${areaId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}
