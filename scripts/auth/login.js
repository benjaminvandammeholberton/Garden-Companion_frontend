import { getHeaders } from '../api/apiService.js';

const loginForm = document.getElementById('form-login');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const errorLogin = document.getElementById('error-login');

const registerForm = document.getElementById('form-register');
const usernameRegister = document.getElementById('username-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
const confirmPasswordRegister = document.getElementById('confirm-password');
const errorRegister = document.getElementById('error-register');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = emailLogin.value;
  const password = passwordLogin.value;

  try {
    const response = await fetch(
      'https://garden-companion-api-24y73.ondigitalocean.app/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `username=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('Access Token:', result.access_token);
      console.log('Refresh Token:', result.refresh_token);
      // Store the access token in localStorage
      localStorage.setItem('access_token', result.access_token);
      window.location.href = 'dashboard.html';
    } else {
      errorLogin.style.display = 'block';
      console.error('Login failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

registerForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = usernameRegister.value;
  const email = emailRegister.value;
  const password = passwordRegister.value;
  const confirmPassword = confirmPasswordRegister.value;

  if (!checkPassword(password, confirmPassword, errorRegister)) {
    return;
  }
  if (!(await checkUsername(username, errorRegister))) {
    return;
  }
  if (!(await checkEmail(email, errorRegister))) {
    return;
  }
  createAccount(username, email, password, errorRegister);
});

function checkPassword(password, confirmPassword, errorRegister) {
  if (password !== confirmPassword) {
    errorRegister.innerHTML =
      'Les mots de passe sont différents.<br>Veuillez réessayer.';
    errorRegister.style.display = 'block';
    return false;
  }
  return true;
}

async function checkUsername(username, errorRegister) {
  try {
    const response = await fetch(
      `https://garden-companion-api-24y73.ondigitalocean.app/api/v1/users/byusername/${username}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    const usernamValidation = await response.json();
    if (usernamValidation[username] === 'already exists') {
      errorRegister.innerHTML =
        "Le nom d'utilisateur est déjà utilisé.<br>Veuillez réessayer.";
      errorRegister.style.display = 'block';
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error during register:', error);
  }
}

async function checkEmail(email, errorRegister) {
  try {
    const response = await fetch(
      `https://garden-companion-api-24y73.ondigitalocean.app/api/v1/users/byemail/${email}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    const usernamValidation = await response.json();
    if (usernamValidation[email] === 'already exists') {
      errorRegister.innerHTML =
        "L'email est déjà utilisé.<br>Veuillez réessayer.";
      errorRegister.style.display = 'block';
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error during register:', error);
  }
}

async function createAccount(username, email, password, errorRegister) {
  try {
    const data = { username: username, email: email, password: password };
    const response = await fetch(
      'https://garden-companion-api-24y73.ondigitalocean.app/api/v1/users/create',
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      errorRegister.style.display = 'block';
      errorRegister.style.borderColor = 'green';
      errorRegister.style.color = 'green';
      errorRegister.innerHTML =
        'Votre compte a été créé avec succès<br>Vous pouvez maintenant vous connecter';
      errorRegister.style.display = 'block';
    } else {
      errorRegister.style.display = 'block';
      errorRegister.style.backgroundColor = 'green';
      errorRegister.style.color = 'green';
      errorRegister.innerHTML =
        "Une erreur s'est produite lors de l'inscription.";
      errorRegister.style.display = 'block';
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
}
