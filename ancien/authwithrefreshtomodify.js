// auth.js

/**
 * Check if the user is authenticated by verifying the validity of the access token.
 * If the access token is not valid, attempt to refresh it using the refresh token.
 * @returns {Promise<boolean>} Returns true if the user is authenticated, false otherwise.
 */
export async function checkAuthentication() {
  // Retrieve access token and refresh token from localStorage
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // Check if the access token is present
  if (accessToken) {
    try {
      // Make a request to test the validity of the access token
      const response = await fetch(
        'http://127.0.0.1:8000/api/v1/auth/test-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check if the response is okay (status 200)
      if (response.ok) {
        // Access token is valid
        return true;
      } else {
        // Access token is invalid; attempt to refresh it
        console.error('Access token is invalid. Attempting to refresh...');
        const refreshSuccess = await refreshToken(); // Attempt to refresh the token

        if (refreshSuccess) {
          // Token refresh successful; user is authenticated
          console.log('Token refresh successful. User is authenticated.');
          return true;
        } else {
          // Token refresh failed; user is not authenticated
          console.error('Token refresh failed. User is not authenticated.');
          return false;
        }
      }
    } catch (error) {
      // Error during the request; log and return false
      console.error('Error checking access token:', error.message);
      return false;
    }
  } else {
    // No access token is present; user is not authenticated
    console.log('No access token found. User is not authenticated.');
    return false;
  }
}

/**
 * Refresh the access token using the refresh token.
 * @returns {Promise<boolean>} Returns true if the token refresh is successful, false otherwise.
 */
export async function refreshToken() {
  try {
    // Make a request to refresh the access token using the refresh token
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
      },
    });

    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    // Extract the new access token from the response
    const { access_token } = await response.json();

    // Update the stored access token in localStorage
    localStorage.setItem('access_token', access_token);

    // Token refresh successful
    console.log('Token refresh successful.');
    return true;
  } catch (error) {
    // Token refresh failed; log and throw an error
    console.error('Token refresh failed:', error.message);
    throw new Error('Token refresh failed');
  }
}
