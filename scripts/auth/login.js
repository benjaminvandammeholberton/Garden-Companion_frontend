document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('login-button');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Access Token:', result.access_token);
        console.log('Refresh Token:', result.refresh_token);
        // Store the access token in localStorage
        localStorage.setItem('access_token', result.access_token);
        window.location.href = 'index.html';
        // Handle successful login, e.g., redirect to another page
      } else {
        // Handle login error
        console.error('Login failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  });
});
