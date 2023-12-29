import { getHeaders } from '../../api/apiService.js';
import { BASE_URL } from '../../api/apiConfig.js';

/**
 * Initializes the user settings and sets up an event listener for the change password form.
 */
export function initializeUserSettings() {
  const changePasswordForm = document.getElementById('form-change-password');
  const message = document.getElementById('message-change-password');
  const deleteAccountForm = document.getElementById('delete-account-form');

  changePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const actualPassword = document.getElementById('password-change-before');
    const newPassword = document.getElementById('password-change-new');
    const newRepeatPassword = document.getElementById('password-change-repeat');
    if (checkNewPassword(newPassword.value, newRepeatPassword.value, message)) {
      if (await verifyActualPassword(actualPassword.value, message)) {
        await updatePassword(newPassword.value, message);
        actualPassword.value = '';
        newPassword.value = '';
        newRepeatPassword.value = '';
        setTimeout(() => {
          message.style.display = 'none';
        }, 7500);
      } else {
        actualPassword.value = '';
        newPassword.value = '';
        newRepeatPassword.value = '';
      }
    } else {
      actualPassword.value = '';
      newPassword.value = '';
      newRepeatPassword.value = '';
    }
  });

  deleteAccountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteAccount();
  });
}

/**
 * Checks if the new password and repeated password match.
 * @param {string} newPassword - The new password.
 * @param {string} newRepeatPassword - The repeated new password.
 * @param {HTMLElement} message - The message element to display error messages.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function checkNewPassword(newPassword, newRepeatPassword, message) {
  if (newPassword !== newRepeatPassword) {
    message.innerHTML =
      'Les nouveaux mots de passe sont différents.<br>Veuillez réessayer.';
    message.style.display = 'block';
    return false;
  }
  return true;
}

/**
 * Verifies the actual password by making a request to the server.
 * @param {string} actualPassword - The current password entered by the user.
 * @param {HTMLElement} message - The message element to display error messages.
 * @returns {Promise<boolean>} - A promise that resolves to true if the password is verified, false otherwise.
 */
async function verifyActualPassword(actualPassword, message) {
  try {
    const response = await fetch(`${BASE_URL}/users/delete_account/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (response.ok) {
      if (!(await response.json())) {
        message.innerHTML =
          'Mot de passe actuel incorrect<br>Veuillez réessayer.';
        message.style.display = 'block';
        message.style.borderColor = '#be4e4e';
        message.style.color = '#be4e4e';
        return false;
      }
      return true;
    } else {
      message.innerHTML = 'Une erreur est survenue<br>Veuillez réessayer.';
      message.style.display = 'block';
      message.style.borderColor = '#be4e4e';
      throw new Error(
        `Failed to verify actual password. Server returned status ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(`Error during password verification: ${error.message}`);
  }
}

/**
 * Updates the user's password by making a request to the server.
 * @param {string} newPassword - The new password to set.
 * @param {HTMLElement} message - The message element to display success or error messages.
 * @throws {Error} - Throws an error if the password update fails.
 */
async function updatePassword(newPassword, message) {
  try {
    const response = await fetch(`${BASE_URL}/users/update_password`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ new_password: newPassword }),
    });
    if (response.ok) {
      const newToken = await response.json();
      localStorage.setItem('access_token', newToken['new_access_token']);
      message.innerHTML = 'Mot de passe modifié avec succès !';
      message.style.display = 'block';
      message.style.color = 'green';
      message.style.borderColor = 'green';
    } else {
      const errorMessage =
        'Failed to update password: ' +
        (response.statusText || 'Unexpected response from the server');
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(`Error during password update: ${error.message}`);
  }
}

/**
 *
 */
async function deleteAccount() {
  try {
    const response = await fetch('');

    if (response.ok) {
      window.location.href = '/index.html';
    } else {
      const errorMessage =
        'Failed to delete account: ' +
        (response.statusText || 'Unexpected response from the server');
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(`Error during account delete: ${error.message}`);
  }
}
