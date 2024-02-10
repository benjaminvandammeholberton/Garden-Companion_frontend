import { BASE_URL } from "../api/apiConfig.js";

const form = document.getElementById("form-ask-password");
const emailInput = document.getElementById("email-ask-password");
const returnMessage = document.getElementById("message");
const loader = document.getElementById('loader')

/*
 *
 *
 */
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value;

  loader.style.display = 'block'
  form.reset()
  
  try {
    const response = await fetch(`${BASE_URL}/password_reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({email: email}),
    });
    if (response.ok) {
      loader.style.display = 'none'
      const result = await response.json();
      returnMessage.innerHTML = "Votre demande a été traitée avec succès. Vous allez recevoir un e-mail contenant un lien pour réinitialiser votre mot de passe.";
      returnMessage.style.display = "block";
      returnMessage.style.borderColor = "green";
      returnMessage.style.color = "green";
    } else {
      loader.style.display = 'none'
      returnMessage.innerHTML = "L'adresse e-mail fournie ne correspond à aucun utilisateur. Veuillez réessayer.";
      returnMessage.style.display = "block";
      returnMessage.style.borderColor = "red";
      returnMessage.style.color = "red";
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});