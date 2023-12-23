import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Retrieves French cities based on postal code.
 *
 * @param {string} postalCode - The postal code used to fetch cities.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 */
export async function getCities(postalCode) {
  // Make a GET request to retrieve french cities by their postal code
  const response = await fetch(
    `${BASE_URL}/forecast/get_cities/${postalCode}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  );

  // Handle the API response
  return handleResponse(response);
}

/**
 * Retrieves weather forecast for a specific location using latitude and longitude.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 */
export async function getForecast(latitude, longitude) {
  // Make a GET request to retrieve french cities by their postal code
  const response = await fetch(
    `${BASE_URL}/forecast/get_forecast/${latitude}/${longitude}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  );

  // Handle the API response
  return handleResponse(response);
}
