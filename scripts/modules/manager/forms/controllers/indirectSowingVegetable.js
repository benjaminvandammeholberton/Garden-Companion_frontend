import * as areaApi from '../../../../api/areaApi.js';
import * as vegetableInfoApi from '../../../../api/vegetableInfoApi.js';
import * as vegetableManagerApi from '../../../../api/vegetableManagerApi.js';
import * as utilsForm from '../utilsForm.js';

export async function indirectSowingVegetableForm(formId, form) {
  const vegetableNames = await vegetableInfoApi.getVegetableInfo();
  vegetableNames.sort((a, b) => a.name.localeCompare(b.name));
  const vegetableNameOptions = document.getElementById(
    'vegetableIndirectSowingNameSelect'
  );
  vegetableNames.forEach(function (vegetable) {
    const newVegetableOption = document.createElement('option');
    newVegetableOption.value = vegetable.name;
    newVegetableOption.text = vegetable.name;
    vegetableNameOptions.add(newVegetableOption);
  });

  // Fetch all gardening areas from the API
  const areas = await areaApi.getAreas();
  const nonSowingAreas = areas.filter((area) => area.sowing_area === true);
  // Sort the areas array by name
  nonSowingAreas.sort((a, b) => a.name.localeCompare(b.name));
  const areaNameOptions = document.getElementById(
    'vegetableDirectSowingAreaSelect'
  );
  nonSowingAreas.forEach(function (area) {
    // Populate the dropdown with gardening area names
    const newAreaOption = document.createElement('option');
    newAreaOption.value = area.area_id;
    newAreaOption.text = area.name;
    areaNameOptions.add(newAreaOption);
  });
  // Custom submitHandler for createAreaForm
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      const data = utilsForm.getFormValues(formId);
      data['sowed'] = true;
      data['planted'] = false;
      data['variety'] = data['variety'] === '' ? 'N/A' : data['variety'];
      data['sowing_date'] =
        data['sowing_date'] === '' ? todayFormatted : data['sowing_date'];
      const response = await vegetableManagerApi.createVegetableManager(data);
      // Show success notification and update display
      document.getElementById('managerContent').style.display = 'flex';
      form.style.display = 'none';
      form.removeEventListener('submit', submitHandler);
      utilsForm.showCustomSuccessNotification(
        `Semi en pot réalisé avec succès !`
      );
    } catch (error) {
      console.error('Error creating area:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };
  form.addEventListener('submit', submitHandler);
  utilsForm.backInitialForm(formId, form, submitHandler);
}
