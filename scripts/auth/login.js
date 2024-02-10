import { getHeaders } from '../api/apiService.js';
import { BASE_URL } from '../api/apiConfig.js';

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
const loaderLogin = document.getElementById('loader-login')
const loaderRegister = document.getElementById('loader-register')

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = emailLogin.value;
  const password = passwordLogin.value;
  loaderLogin.style.display = 'block'

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
    });

    if (response.ok) {
      loaderLogin.style.display = 'none'
      const result = await response.json();
      console.log('Access Token:', result.access_token);
      console.log('Refresh Token:', result.refresh_token);
      // Store the access token in localStorage
      localStorage.setItem('access_token', result.access_token);
      window.location.href = 'dashboard.html';
    } else if (response.status == 403) {
      loaderLogin.style.display = 'none'
      errorLogin.style.display = 'block';
      errorLogin.innerHTML =
        "Votre compte n'a pas encore été vérifié !<br> <br>Veuillez consulter votre boîte de réception et cliquer sur le lien de confirmation que nous vous avons envoyé afin de valider votre inscription.";
    } else {
      loaderLogin.style.display = 'none'
      errorLogin.innerHTML = "Nom d'utilisateur ou mot de passe incorrect.";
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
    registerForm.reset();
    return;
  }
  if (!(await checkUsername(username, errorRegister))) {
    registerForm.reset();
    return;
  }
  if (!(await checkEmail(email, errorRegister))) {
    registerForm.reset();
    return;
  }
  createAccount(username, email, password, errorRegister);
  registerForm.reset();
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
  loaderRegister.style.display = 'block'
  try {
    const response = await fetch(`${BASE_URL}/users/byusername/${username}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const usernamValidation = await response.json();
    if (usernamValidation[username] === 'already exists') {
      errorRegister.innerHTML =
        "Le nom d'utilisateur est déjà utilisé.<br>Veuillez réessayer.";
      errorRegister.style.display = 'block';
      loaderRegister.style.display = 'none'
      return false;
    }
    loaderRegister.style.display = 'none'
    return true;
  } catch (error) {
    console.error('Error during register:', error);
  }
}

async function checkEmail(email, errorRegister) {
  loaderRegister.style.display = 'block'
  try {
    const response = await fetch(`${BASE_URL}/users/byemail/${email}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const usernamValidation = await response.json();
    if (usernamValidation[email] === 'already exists') {
      errorRegister.innerHTML =
        "L'email est déjà utilisé.<br>Veuillez réessayer.";
      errorRegister.style.display = 'block';
      loaderRegister.style.display = 'none'
      return false;
    }
    loaderRegister.style.display = 'none'
    return true;
  } catch (error) {
    console.error('Error during register:', error);
  }
}

async function createAccount(username, email, password, errorRegister) {
  loaderRegister.style.display = 'block'
  try {
    const data = { username: username, email: email, password: password };
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (response.ok) {
      loaderRegister.style.display = 'none'
      errorRegister.style.display = 'block';
      errorRegister.style.borderColor = 'green';
      errorRegister.style.color = 'green';
      errorRegister.style.width = '400px';
      errorRegister.innerHTML =
        'Votre compte a été créé avec succès 😃🥕<br>Un e-mail de validation vous a été envoyé afin de finaliser votre inscription.';
      errorRegister.style.display = 'block';
    } else {
      loaderRegister.style.display = 'none'
      errorRegister.style.display = 'block';
      errorRegister.style.borderColor = 'red';
      errorRegister.style.color = 'red';
      errorRegister.innerHTML =
        "Une erreur s'est produite lors de l'inscription.";
      errorRegister.style.display = 'block';
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
}
