/**
 * Retrieves headers for making HTTP requests with JSON content.
 *
 * @returns {Object} Headers object with Content-Type, Accept, and Authorization.
 */
export function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
}

/**
 * Handles the response from an HTTP request.
 *
 * If the response is not OK, it checks for specific status codes and takes appropriate actions:
 * - 403: Token expired, redirects to 'login.html'.
 * - 429: Throws an 'Error' with message 'Too Many Requests'.
 * Otherwise, it throws an 'Error' with the message 'Failed to fetch data from the API'.
 *
 * If the response is OK, it returns the JSON data from the response.
 *
 * @param {Response} response - The response object from the HTTP request.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 * @throws {Error} If the response is not OK, with appropriate error messages.
 */
export function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 403) {
      window.location.href = 'login.html';
      throw new Error('Token expired');
    } else if (response.status === 429) {
      throw new Error('Too Many Requests');
    } else {
      throw new Error('Failed to fetch data from the API');
    }
  } else {
    return response.json();
  }
}
