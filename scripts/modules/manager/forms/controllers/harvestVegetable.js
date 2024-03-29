import * as areaApi from '../../../../api/areaApi.js';
import * as vegetableManagerApi from '../../../../api/vegetableManagerApi.js';
import * as utilsForm from '../utilsForm.js';

export async function harvestVegetableForm(formId, form) {
  // Fetch all gardening areas from the API
  const areas = await areaApi.getAreas();
  const nonSowingAreas = areas.filter((area) => area.sowing_area === false);
  // Sort the areas array by name
  nonSowingAreas.sort((a, b) => a.name.localeCompare(b.name));
  const areaNameOptions = document.getElementById('harvestAreaSelect');
  nonSowingAreas.forEach(function (area) {
    // Populate the dropdown with gardening area names
    const newAreaOption = document.createElement('option');
    newAreaOption.value = area.area_id;
    newAreaOption.text = area.name;
    areaNameOptions.add(newAreaOption);
  });

  // Fetch all vegetables from the API
  const allVegetables = await vegetableManagerApi.getVegetableManager();
  const vegetableSelect = document.getElementById('harvestVegetableSelect');

  // Display the vegetable from the first area select
  const defaultVegetableList = allVegetables.filter(
    (vegetable) => vegetable.area.area_id === nonSowingAreas[0].area_id
  );

  defaultVegetableList.forEach(function (vegetable) {
    if (!vegetable.remove_date) {
      const newVegetableOption = document.createElement('option');
      newVegetableOption.value = vegetable.vegetable_manager_id;
      newVegetableOption.text = `${vegetable.name} - ${vegetable.variety}`;
      vegetableSelect.add(newVegetableOption);
    }
  });

  // Add an event listener for the 'change' event on the 'sowingAreas' select element
  areaNameOptions.addEventListener('change', async () => {
    // Clear the options in the 'vegetableSowed' select element
    vegetableSelect.innerHTML = '';
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
        }
      });
    }
  });

  const quantity = document.getElementById('harvestVegetableQuantity');
  quantity.value = 0;

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Get form values using utility function
      const data = utilsForm.getFormValues(formId);

      // Fetch information about the vegetable selected
      const vegetableHarvested =
        await vegetableManagerApi.getVegetableManagerById(
          data['vegetable_manager_id']
        );

      // Set the harvest date with the today's date if the user didn't set the date input
      // and if the vegetable has not been harvested yet
      // if the vegetable has been harvested before, the harvested date will not change
      // from vegetable information
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      if (vegetableHarvested.harvest_date === null) {
        if (data['harvest_date'] === '') {
          data['harvest_date'] = todayFormatted;
        }
      } else {
        data['harvest_date'] = vegetableHarvested.harvest_date;
      }

      // Add the quantity harvested enter by the user with the actual harvested quantity
      // of the vegetable selected
      data['harvest_quantity'] = parseFloat(data['harvest_quantity']);
      data['harvest_quantity'] += vegetableHarvested.harvest_quantity;

      // Call the API to update the vegetable
      await vegetableManagerApi.updateVegetableManagerById(
        data['vegetable_manager_id'],
        data
      );

      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(`Récolte réalisée avec succès !`);
    } catch (error) {
      console.error('Error creating area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}
