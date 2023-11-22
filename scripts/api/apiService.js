export function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
}

// Helper function to handle common response logic
export function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 403) {
      // Token expired, redirect to login.html
      window.location.href = 'login.html';
    } else {
      // Some other error occurred
      throw new Error('Failed to fetch data from the API');
    }
  } else {
    return response.json();
  }
}
