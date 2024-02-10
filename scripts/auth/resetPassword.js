import { getHeaders } from "../api/apiService.js";
import { BASE_URL } from "../api/apiConfig.js";

const loginForm = document.getElementById("form-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");
const errorLogin = document.getElementById("error-login");
const loaderSetPassword = document.getElementById("loader-set-password");
const loaderLogin = document.getElementById("loader-login");

loginForm.style.display = "none";
/*
 *
 *
 */
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailLogin.value;
  const password = passwordLogin.value;

  loaderLogin.style.display = "block";

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
    });

    if (response.ok) {
      loaderLogin.style.display = "none";
      const result = await response.json();
      console.log("Access Token:", result.access_token);
      console.log("Refresh Token:", result.refresh_token);
      // Store the access token in localStorage
      localStorage.setItem("access_token", result.access_token);
      window.location.href = "dashboard.html";
    } else if (response.status == 403) {
      loaderLogin.style.display = "none";
      errorLogin.style.display = "block";
      errorLogin.innerHTML =
        "Votre compte n'a pas encore été vérifié !<br> <br>Veuillez consulter votre boîte de réception et cliquer sur le lien de confirmation que nous vous avons envoyé afin de valider votre inscription.";
    } else {
      loaderLogin.style.display = "none";
      errorLogin.innerHTML = "Nom d'utilisateur ou mot de passe incorrect.";
      errorLogin.style.display = "block";
      console.error("Login failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

const resetPasswordForm = document.getElementById("form-reset-password");
const passwordResetPassword = document.getElementById(
  "password-reset-password"
);
const confirmPasswordResetPassword =
  document.getElementById("confirm-password");
const errorResetPassword = document.getElementById("error-reset-password");
const param = new URLSearchParams(window.location.search);
const token = param.get("token");

/*
 *
 *
 */
resetPasswordForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const password = passwordResetPassword.value;
  const confirmPassword = confirmPasswordResetPassword.value;

  if (!checkPassword(password, confirmPassword, errorResetPassword)) {
    resetPasswordForm.reset();
    return;
  }
  resetPassword(token, password, errorResetPassword);
  resetPasswordForm.reset();
});

/*
 *
 *
 */
function checkPassword(password, confirmPassword, errorResetPassword) {
  if (password !== confirmPassword) {
    errorResetPassword.innerHTML =
      "Les mots de passe sont différents.<br>Veuillez réessayer.";
    errorResetPassword.style.display = "block";
    return false;
  }
  return true;
}

/*
 *
 *
 */
async function resetPassword(token, password, errorResetPassword) {
  loaderSetPassword.style.display = "block";
  try {
    const data = { password: password, token: token };
    console.log(data);
    const response = await fetch(`${BASE_URL}/password_reset`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      loaderSetPassword.style.display = "none";
      errorResetPassword.style.display = "block";
      errorResetPassword.style.borderColor = "green";
      errorResetPassword.style.color = "green";
      errorResetPassword.style.width = "400px";
      errorResetPassword.innerHTML =
        "Votre mot de passe a été réinitialisé 😃🥕<br>Vous pouvez vous connecter !";
      errorResetPassword.style.display = "block";
      loginForm.style.display = "flex";
    } else {
      console.log(response);
      loaderSetPassword.style.display = "none";
      errorResetPassword.style.display = "block";
      errorResetPassword.style.borderColor = "red";
      errorResetPassword.style.color = "red";
      errorResetPassword.innerHTML =
        "Une erreur s'est produite lors du changement de mot de passe.";
      errorResetPassword.style.display = "block";
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
}
