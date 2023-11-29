import * as areaApi from '../../../../api/areaApi.js';
import * as utilsForm from '../utilsForm.js';

export function updateVegetableForm(formId, form) {
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Get form values using utility function
      const data = utilsForm.getFormValues(formId);
      // Call the API to create a new gardening area
      const response = await areaApi.createAreaApi(data);
      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(
        `Espace de culture créé avec succès !`
      );
    } catch (error) {
      console.error('Error creating area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}
