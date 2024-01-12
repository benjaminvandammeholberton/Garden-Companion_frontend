import { getAreas } from '../../../api/areaApi.js';

export function backInitialForm(formId, form, submitHandler) {
  // Use event delegation to handle dynamic elements
  document.addEventListener('click', (event) => {
    const backButton = event.target.closest('.form-container__back-button');

    if (backButton) {
      document.getElementById('managerContent').style.display = 'flex';
      document.getElementById(formId).style.display = 'none';
      // Remove the submit event listener

      // console.log(submitEventListenerReference);
      form.removeEventListener('submit', submitHandler);
    }
  });
}

export function getFormValues(formId) {
  const form = document.getElementById(formId);
  const formData = {};
  if (!form) {
    console.error(`Form with id '${formId}' not found.`);
    return null;
  }

  form.querySelectorAll('input:not([type="submit"])').forEach((element) => {
    if (element.type === 'radio' && element.checked) {
      formData[element.name] = element.value;
    } else if (element.type !== 'radio') {
      formData[element.name] = element.value;
    }
  });
  // Handle select elements
  form.querySelectorAll('select').forEach((element) => {
    formData[element.name] = element.value;
  });

  return formData;
}

export function showCustomSuccessNotification(message) {
  const notification = document.getElementById('managerNotification');
  notification.style.backgroundColor = '#7ad17dcb';
  notification.textContent = message;

  // Remove the notification after a delay (e.g., 6 seconds)
  setTimeout(() => {
    notification.textContent = 'Notifications';
    notification.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    notification.className = 'notification';
  }, 5000);
}

export function showCustomFailNotification(message) {
  const notification = document.getElementById('managerNotification');
  notification.style.backgroundColor = '#ea7878c7';
  notification.textContent = message;

  // Remove the notification after a delay (e.g., 6 seconds)
  setTimeout(() => {
    notification.textContent = 'Notifications';
    notification.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
  }, 5000);
}

export async function checkIfNoSowingArea() {
  try {
    const areas = await getAreas();
    let noSowingArea = [];
    areas.forEach((area) => {
      if (area.sowing_area === false) {
        noSowingArea.push(area);
      }
    });
    if (noSowingArea.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Fail to get areas: ${error}`);
  }
}

export async function checkIfSowingArea() {
  try {
    const areas = await getAreas();
    let sowingArea = [];
    areas.forEach((area) => {
      if (area.sowing_area === true) {
        sowingArea.push(area);
      }
    });
    if (sowingArea.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Fail to get areas: ${error}`);
  }
}
