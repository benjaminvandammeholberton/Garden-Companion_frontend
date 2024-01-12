// managerModule.js
import { renderAreaForm } from './forms/renderAreaForms.js';
import { renderVegetableForm } from './forms/renderVegetableForms.js';
import { showCustomFailNotification } from './forms/utilsForm.js';
import { checkIfSowingArea } from './forms/utilsForm.js';
import { checkIfNoSowingArea } from './forms/utilsForm.js';

export function initializeManagerModule() {
  const icons = document.getElementsByClassName('manager__icons__icon');

  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];

    icon.addEventListener('click', async () => {
      // Get the label attribute from the clicked icon
      const id = icon.getAttribute('id');

      // Get the form info from the mapping
      const formInfo = getFormInfoByIconID(id);

      // Check if it's an area form
      if (formInfo && formInfo.type === 'area') {
        renderAreaForm(formInfo.formId);
        document.getElementById('managerContent').style.display = 'none';
        document.getElementById(formInfo.formId).style.display = 'flex';
      } else if (formInfo && formInfo.type === 'vegetable') {
        // check if there is at least one non sowing area
        if (formInfo.formId === 'directSowingVegetableForm') {
          if (!(await checkIfNoSowingArea())) {
            showCustomFailNotification(
              'Veuillez créer une zone de culture pour vos semis en place'
            );
          } else {
            // Hide managerContent
            document.getElementById('managerContent').style.display = 'none';
            document.getElementById(formInfo.formId).style.display = 'flex';
            renderVegetableForm(formInfo.formId);
          }
          // check if there is at least one non sowing area
        } else if (formInfo.formId === 'indirectSowingVegetableForm') {
          if (!(await checkIfSowingArea())) {
            showCustomFailNotification(
              'Veuillez créer une zone de culture réservée à vos semis en pot'
            );
          } else {
            // Hide managerContent
            document.getElementById('managerContent').style.display = 'none';
            document.getElementById(formInfo.formId).style.display = 'flex';
            renderVegetableForm(formInfo.formId);
          }
        } else {
          // Hide managerContent
          document.getElementById('managerContent').style.display = 'none';
          document.getElementById(formInfo.formId).style.display = 'flex';
          renderVegetableForm(formInfo.formId);
        }
      }
    });
  }
}

function getFormInfoByIconID(id) {
  // Define the mapping of labels to form info
  const iconToFormInfoMap = {
    directSowVegetable: {
      formId: 'directSowingVegetableForm',
      type: 'vegetable',
    },
    indirectSowVegetable: {
      formId: 'indirectSowingVegetableForm',
      type: 'vegetable',
    },
    plantVegetable: { formId: 'plantingVegetableForm', type: 'vegetable' },
    harvestVegetable: { formId: 'harvestVegetableForm', type: 'vegetable' },
    removeVegetable: { formId: 'removeVegetableForm', type: 'vegetable' },
    updateSowVegetable: { formId: 'updateVegetableForm', type: 'vegetable' },
    createArea: { formId: 'createAreaForm', type: 'area' },
    updateArea: { formId: 'updateAreaForm', type: 'area' },
    deleteArea: { formId: 'deleteAreaForm', type: 'area' },
  };
  // Return the corresponding form info for the given label
  return iconToFormInfoMap[id];
}
