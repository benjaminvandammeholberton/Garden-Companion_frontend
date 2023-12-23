// auth.js

/**
 * Check if the user is authenticated by verifying the validity of the access token.
 * If the access token is not valid, attempt to refresh it using the refresh token.
 * @returns {Promise<boolean>} Returns true if the user is authenticated, false otherwise.
 */
export async function checkAuthentication() {
  // Retrieve access token and refresh token from localStorage
  const accessToken = localStorage.getItem('access_token');

  // Check if the access token is present
  if (accessToken) {
    try {
      // Make a request to test the validity of the access token
      const response = await fetch(
        'https://garden-companion-api-24y73.ondigitalocean.app/api/v1/auth/test-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check if the response is okay (status 200)
      if (!response.ok) {
        window.location.href = '/login.html';
      }
    } catch (error) {
      // Error during the request; log and return false
      console.error('Error checking access token:', error.message);
      window.location.href = '/login.html';
    }
  } else {
    // No access token is present; user is not authenticated
    console.log('No access token found. User is not authenticated.');
    window.location.href = '/login.html';
  }
}
