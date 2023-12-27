import { BASE_URL } from './apiConfig.js';
import { handleResponse, getHeaders } from './apiService.js';

/**
 * Fetches all todos for the current user from the API.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue fetching todos.
 */
export async function getTodos() {
  // Make a GET request to fetch todos
  const response = await fetch(`${BASE_URL}/todo/`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Creates a new todo for the current user.
 * @param {Object} data - The data for creating a new todo.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue creating the todo.
 */
export async function createTodo(data) {
  // Make a POST request to create a new todo
  const response = await fetch(`${BASE_URL}/todo/create`, {
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
 * Retrieves a todo by its ID.
 * @param {number} todoId - The ID of the todo to retrieve.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue retrieving the todo.
 */
export async function getTodoById(todoId) {
  // Make a GET request to retrieve a todo by its ID
  const response = await fetch(`${BASE_URL}/todo/${todoId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Updates a todo by its ID.
 * @param {number} todoId - The ID of the todo to update.
 * @param {Object} data - The data for updating the todo.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue updating the todo.
 */
export async function updateTodoById(todoId, data) {
  // Make a PUT request to update a todo by its ID
  const response = await fetch(`${BASE_URL}/todo/${todoId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Handle the API response
  return handleResponse(response);
}

/**
 * Deletes a todo by its ID.
 * @param {number} todoId - The ID of the todo to delete.
 * @returns {Promise<{ok: boolean, data: Object|null}>} A promise that resolves to an object containing the success status and data.
 * @throws {Error} Throws an error if there is an issue deleting the todo.
 */
export async function deleteTodoById(todoId) {
  // Make a DELETE request to delete a todo by its ID
  const response = await fetch(`${BASE_URL}/todo/${todoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json',
    },
  });

  // Handle the API response
  return handleResponse(response);
}
