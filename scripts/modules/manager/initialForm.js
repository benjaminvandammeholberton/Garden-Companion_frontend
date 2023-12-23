// managerModule.js
import { renderAreaForm } from './forms/renderAreaForms.js';
import { renderVegetableForm } from './forms/renderVegetableForms.js';

export function initializeManagerModule() {
  const icons = document.getElementsByClassName('manager__icons__icon');

  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];

    icon.addEventListener('click', () => {
      // Hide managerContent
      document.getElementById('managerContent').style.display = 'none';

      // Get the label attribute from the clicked icon
      const id = icon.getAttribute('id');

      // Get the form info from the mapping
      const formInfo = getFormInfoByIconID(id);

      // Check if it's an area form
      if (formInfo && formInfo.type === 'area') {
        renderAreaForm(formInfo.formId);
      } else if (formInfo && formInfo.type === 'vegetable') {
        // Assuming there's a renderVegetableForm function
        renderVegetableForm(formInfo.formId);
      }

      // Show the corresponding form based on the id
      document.getElementById(formInfo.formId).style.display = 'flex';
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
