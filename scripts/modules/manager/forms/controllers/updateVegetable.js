import * as areaApi from '../../../../api/areaApi.js';
import * as vegetableManagerApi from '../../../../api/vegetableManagerApi.js';
import * as utilsForm from '../utilsForm.js';

export async function updateVegetableForm(formId, form) {
  // Fetch all gardening areas from the API
  const areas = await areaApi.getAreas();
  const sortedAreas = areas.sort((a, b) => a.name.localeCompare(b.name));
  const areaNameOptions = document.getElementById('updateVegetableAreaSelect');
  sortedAreas.forEach(function (area) {
    // Populate the dropdown with gardening area names
    const newAreaOption = document.createElement('option');
    newAreaOption.value = area.area_id;
    newAreaOption.text = area.name;
    areaNameOptions.add(newAreaOption);
  });
  // Fetch all vegetables from the API
  const allVegetables = await vegetableManagerApi.getVegetableManager();
  const vegetableSelect = document.getElementById('updateVegetableSelect');
  const quantity = document.getElementById('updateQantity');
  // Display the vegetable from the first area select
  const defaultVegetableList = allVegetables.filter(
    (vegetable) => vegetable.area.area_id === sortedAreas[0].area_id
  );

  defaultVegetableList.forEach(function (vegetable) {
    if (!vegetable.remove_date) {
      const newVegetableOption = document.createElement('option');
      newVegetableOption.value = vegetable.vegetable_manager_id;
      newVegetableOption.text = `${vegetable.name} - ${vegetable.variety}`;
      vegetableSelect.add(newVegetableOption);
      quantity.value = defaultVegetableList[0].quantity;
    }
  });

  // Add an event listener for the 'change' event on the 'sowingAreas' select element
  areaNameOptions.addEventListener('change', async () => {
    // Clear the options in the 'vegetableSowed' select element
    vegetableSelect.innerHTML = '';
    quantity.value = '';
    // Get the selected area ID
    const selectedAreaId = areaNameOptions.value;
    const VegetableList = allVegetables.filter(
      (vegetable) => vegetable.area.area_id === selectedAreaId
    );
    if (VegetableList) {
      VegetableList.forEach(function (vegetable) {
        if (!vegetable.remove_date) {
          const newVegetableOption = document.createElement('option');
          newVegetableOption.value = vegetable.vegetable_manager_id;
          newVegetableOption.text = `${vegetable.name} - ${vegetable.variety}`;
          vegetableSelect.add(newVegetableOption);
          const selectedQuantity = VegetableList[0].quantity;
          quantity.value = selectedQuantity;
        }
      });
    }
  });

  // Add an event listener for the 'change' event on the 'vegetableSelect' select element
  vegetableSelect.addEventListener('change', () => {
    // Get the selected vegetable ID
    const selectedVegetableId = vegetableSelect.value;

    // Find the selected vegetable from the allVegetables array
    const selectedVegetable = allVegetables.find(
      (vegetable) => vegetable.vegetable_manager_id === selectedVegetableId
    );

    // Update the quantity input field with the selected vegetable's quantity
    if (selectedVegetable) {
      quantity.value = selectedVegetable.quantity;
    }
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Get form values using utility function
      const data = utilsForm.getFormValues(formId);
      const vegetableSelected =
        await vegetableManagerApi.getVegetableManagerById(
          data['vegetable_manager_id']
        );
      if (data['quantity'] >= vegetableSelected.quantity) {
        await vegetableManagerApi.deleteVegetableManagerById(
          vegetableSelected.vegetable_manager_id
        );
      } else {
        data['quantity'] = vegetableSelected.quantity - data['quantity'];
        await vegetableManagerApi.updateVegetableManagerById(
          vegetableSelected.vegetable_manager_id,
          data
        );
      }
      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(
        `Suppression réalisée avec succès !`
      );
    } catch (error) {
      console.error('Error creating area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}
