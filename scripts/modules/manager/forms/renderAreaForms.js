// Importing utility functions and API modules
import * as utilsForm from './utilsForm.js';
import { generateCreateAreaFormContent } from './templates/createAreaTemplate.js';
import { generateUpdateAreaFormContent } from './templates/updateAreaTemplate.js';
import { generateDeleteAreaFormContent } from './templates/deleteAreaTemplate.js';
import * as areaApi from '../../../api/areaApi.js';
import * as vegetableManagerApi from '../../../api/vegetableManagerApi.js';

/**
 * Renders a gardening area form based on its ID.
 * @param {string} formId - The ID of the form element.
 */
export function renderAreaForm(formId) {
  const form = document.getElementById(formId);
  // Get the template function corresponding to the form ID
  const templateFunction = getTemplateByFormId(formId);
  // Generate form content using the template function
  form.innerHTML = templateFunction();
  // Get the function corresponding to the form ID and apply it to the form
  const formFunction = getFunctionByFormId(formId);
  formFunction(formId, form);
}

/**
 * Creates a new gardening area form.
 * @param {string} formId - The ID of the form element.
 * @param {HTMLFormElement} form - The form element.
 */
function createAreaForm(formId, form) {
  // Custom submitHandler for createAreaForm
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

/**
 * Updates an existing gardening area form.
 * @param {string} formId - The ID of the form element.
 * @param {HTMLFormElement} form - The form element.
 */
async function updateAreaForm(formId, form) {
  // Fetch all gardening areas from the API
  const areas = await areaApi.getAreas();
  // Sort the areas array by name
  areas.sort((a, b) => a.name.localeCompare(b.name));
  const areaNameOptions = document.getElementById('areaUpdateNameSelect');
  areas.forEach(function (area) {
    // Populate the dropdown with gardening area names
    const newAreaOption = document.createElement('option');
    newAreaOption.value = area.area_id;
    newAreaOption.text = area.name;
    areaNameOptions.add(newAreaOption);
  });

  // Set default values based on the initially selected area
  const initialSelectedAreaId = areaNameOptions.value;
  const initialSelectedArea = areas.find(
    (area) => area.area_id === initialSelectedAreaId
  );
  document.getElementById('areaNewName').value = initialSelectedArea
    ? initialSelectedArea.name
    : '';
  document.getElementById('areaNewSurface').value = initialSelectedArea
    ? initialSelectedArea.surface
    : '';

  // Set the radio button based on the value of sowing_area
  const sowingAreaRadioYes = document.getElementById('reservationUpdateYes');
  const sowingAreaRadioNo = document.getElementById('reservationUpdateNo');
  if (initialSelectedArea && initialSelectedArea.sowing_area === true) {
    sowingAreaRadioYes.checked = true;
  } else {
    sowingAreaRadioNo.checked = true;
  }

  // Event listener for changes in the dropdown selection
  areaNameOptions.addEventListener('change', function () {
    const selectedAreaId = areaNameOptions.value;
    const selectedArea = areas.find((area) => area.area_id === selectedAreaId);

    // Set default values for the name and surface fields
    document.getElementById('areaNewName').value = selectedArea
      ? selectedArea.name
      : '';
    document.getElementById('areaNewSurface').value = selectedArea
      ? selectedArea.surface
      : '';

    // Set the radio button based on the value of sowing_area
    const sowingAreaRadioYes = document.getElementById('reservationUpdateYes');
    const sowingAreaRadioNo = document.getElementById('reservationUpdateNo');

    if (selectedArea && selectedArea.sowing_area === true) {
      sowingAreaRadioYes.checked = true;
      sowingAreaRadioNo.checked = false;
    } else {
      sowingAreaRadioYes.checked = false;
      sowingAreaRadioNo.checked = true;
    }
  });

  // Custom submitHandler for updateAreaForm
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Get form values using utility function
      const data = utilsForm.getFormValues(formId);
      // Call the API to update an existing gardening area
      const response = await areaApi.updateAreaById(data.area_id, data);
      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(
        `Espace de culture modifié avec succès !`
      );
    } catch (error) {
      console.error('Error updating area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}

/**
 * Deletes an existing gardening area form.
 * @param {string} formId - The ID of the form element.
 * @param {HTMLFormElement} form - The form element.
 */
async function deleteAreaForm(formId, form) {
  // Fetch all gardening areas from the API
  const areas = await areaApi.getAreas();
  // Sort the areas array by name
  areas.sort((a, b) => a.name.localeCompare(b.name));
  const areaNameOptions = document.getElementById('areaDeleteNameSelect');
  areas.forEach(function (area) {
    // Populate the dropdown with gardening area names
    const newAreaOption = document.createElement('option');
    newAreaOption.value = area.area_id;
    newAreaOption.text = area.name;
    areaNameOptions.add(newAreaOption);
  });

  // Custom submitHandler for deleteAreaForm
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Get form values using utility function
      const data = utilsForm.getFormValues(formId);
      // Call the API to delete an existing gardening area
      await areaApi.deleteAreaById(data.area_id);
      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(
        `Espace de culture supprimé avec succès !`
      );
    } catch (error) {
      console.error('Error deleting area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}

/**
 * Gets the form function corresponding to a given form ID.
 * @param {string} formId - The ID of the form.
 * @returns {Function} - The function corresponding to the form ID.
 */
function getFunctionByFormId(formId) {
  // Define the mapping of form IDs to functions
  const formIdToFunctionMap = new Map([
    ['createAreaForm', createAreaForm],
    ['updateAreaForm', updateAreaForm],
    ['deleteAreaForm', deleteAreaForm],
    // Add more mappings as needed
  ]);

  // Return the corresponding function for the given form ID
  return formIdToFunctionMap.get(formId);
}

/**
 * Gets the template function corresponding to a given form ID.
 * @param {string} formId - The ID of the form.
 * @returns {Function} - The template function corresponding to the form ID.
 */
function getTemplateByFormId(formId) {
  // Define the mapping of form IDs to functions
  const formIdToFormTemplateMap = new Map([
    ['createAreaForm', generateCreateAreaFormContent],
    ['updateAreaForm', generateUpdateAreaFormContent],
    ['deleteAreaForm', generateDeleteAreaFormContent],
    // Add more mappings as needed
  ]);

  // Return the corresponding function for the given form ID
  return formIdToFormTemplateMap.get(formId);
}
