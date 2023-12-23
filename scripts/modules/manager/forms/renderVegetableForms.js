// renderVegetableForms.js
import { generateDirectSowingVegetableFormContent } from './templates/directSowingVegetableTemplate.js';
import { generateIndirectSowingVegetableFormContent } from './templates/indirectSowingVegetableTemplate.js';
import { generatePlantingVegetableFormContent } from './templates/plantingVegetableTemplate.js';
import { generateHarvestVegetableFormContent } from './templates/harvestVegetableTemplate.js';
import { generateRemoveVegetableFormContent } from './templates/removeVegetableTemplate.js';
import { generateUpdateVegetableFormContent } from './templates/updateVegetableTemplate.js';
import { directSowingVegetableForm } from './controllers/directSowingVegetable.js';
import { indirectSowingVegetableForm } from './controllers/indirectSowingVegetable.js';
import { plantingVegetableForm } from './controllers/plantingVegetable.js';
import { harvestVegetableForm } from './controllers/harvestVegetable.js';
import { removeVegetableForm } from './controllers/removeVegetable.js';
import { updateVegetableForm } from './controllers/updateVegetable.js';

export function renderVegetableForm(formId) {
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
 * Gets the form function corresponding to a given form ID.
 * @param {string} formId - The ID of the form.
 * @returns {Function} - The function corresponding to the form ID.
 */
function getFunctionByFormId(formId) {
  // Define the mapping of form IDs to functions
  const formIdToFunctionMap = new Map([
    ['directSowingVegetableForm', directSowingVegetableForm],
    ['indirectSowingVegetableForm', indirectSowingVegetableForm],
    ['plantingVegetableForm', plantingVegetableForm],
    ['harvestVegetableForm', harvestVegetableForm],
    ['removeVegetableForm', removeVegetableForm],
    ['updateVegetableForm', updateVegetableForm],
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
    ['directSowingVegetableForm', generateDirectSowingVegetableFormContent],
    ['indirectSowingVegetableForm', generateIndirectSowingVegetableFormContent],
    ['plantingVegetableForm', generatePlantingVegetableFormContent],
    ['harvestVegetableForm', generateHarvestVegetableFormContent],
    ['removeVegetableForm', generateRemoveVegetableFormContent],
    ['updateVegetableForm', generateUpdateVegetableFormContent],
  ]);

  // Return the corresponding function for the given form ID
  return formIdToFormTemplateMap.get(formId);
}
