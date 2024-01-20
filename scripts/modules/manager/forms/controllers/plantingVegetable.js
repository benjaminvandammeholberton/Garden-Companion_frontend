import * as areaApi from '../../../../api/areaApi.js';
import * as vegetableInfoApi from '../../../../api/vegetableInfoApi.js';
import * as vegetableManagerApi from '../../../../api/vegetableManagerApi.js';
import {
  generatePlantingNewVegetableFormContent,
  generatePlantingSowedVegetableFormContent,
} from '../templates/plantingVegetableTemplate.js';
import * as utilsForm from '../utilsForm.js';

export async function plantingVegetableForm(formId, form) {
  // Connect the back button
  const backButton = document.getElementById('backFormButtonPlanting');
  backButton.addEventListener('click', () => {
    document.getElementById('plantingVegetableForm').style.display = 'none';
    document.getElementById('managerContent').style.display = 'flex';
  });

  const newPlantedVegetable = document.getElementById('newOrigin');
  const sowedPlantedVegetable = document.getElementById('sowingSpaceOrigin');
  newPlantedVegetableController(newPlantedVegetable, form, formId);
  sowedPlantedVegetableController(sowedPlantedVegetable, form, formId);
}

function newPlantedVegetableController(newPlantedVegetable, form, formId) {
  newPlantedVegetable.addEventListener('click', async () => {
    if (!(await utilsForm.checkIfNoSowingArea())) {
      document.getElementById('plantingVegetableForm').style.display = 'none';
      document.getElementById('managerContent').style.display = 'flex';
      utilsForm.showCustomFailNotification(
        'Veuillez créer une zone de culture pour vos plantations'
      );
    } else {
      form.innerHTML = generatePlantingNewVegetableFormContent();
      const vegetableNames = await vegetableInfoApi.getVegetableInfo();
      vegetableNames.sort((a, b) => a.name.localeCompare(b.name));
      const vegetableNameOptions = document.getElementById(
        'vegetableDirectPlantingNameSelect'
      );
      vegetableNames.forEach(function (vegetable) {
        const newVegetableOption = document.createElement('option');
        newVegetableOption.value = vegetable.name;
        newVegetableOption.text = vegetable.name;
        vegetableNameOptions.add(newVegetableOption);
      });
      // Add to the dropdown the custom vegetable choice
      const newVegetableOption = document.createElement('option');
      newVegetableOption.id = 'custom-choice';
      newVegetableOption.text = 'Autre';
      newVegetableOption.value = 'Autre';
      vegetableNameOptions.add(newVegetableOption);

      // Add event listener to the <select> element to handle the change event
      vegetableNameOptions.addEventListener('change', (event) => {
        const selectedValue = event.target.value;

        // Check if the selected value is the custom choice
        if (selectedValue === 'Autre') {
          const inputReplace = document.createElement('input');
          inputReplace.className = 'form-container__form__field__input';
          inputReplace.type = 'text';
          inputReplace.id = 'vegetableDirectSowingNameSelect';
          inputReplace.name = 'name';
          inputReplace.maxLength = '20';
          inputReplace.minLength = '3';
          vegetableNameOptions.replaceWith(inputReplace);
        }
      });
      const areas = await areaApi.getAreas();
      const nonSowingAreas = areas.filter((area) => area.sowing_area === false);
      // Sort the areas array by name
      nonSowingAreas.sort((a, b) => a.name.localeCompare(b.name));
      const areaNameOptions = document.getElementById(
        'vegetableDirectPlantingAreaSelect'
      );
      nonSowingAreas.forEach(function (area) {
        const newAreaOption = document.createElement('option');
        newAreaOption.value = area.area_id;
        newAreaOption.text = area.name;
        areaNameOptions.add(newAreaOption);
      });
      const submitHandler = async (event) => {
        event.preventDefault();
        try {
          const today = new Date();
          const todayFormatted = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
          const data = utilsForm.getFormValues(formId);
          data['sowed'] = false;
          data['planted'] = true;
          data['variety'] = data['variety'] === '' ? 'N/A' : data['variety'];
          data['planting_date'] =
            data['planting_date'] === ''
              ? todayFormatted
              : data['planting_date'];
          const response = await vegetableManagerApi.createVegetableManager(
            data
          );
          // Show success notification and update display
          document.getElementById('managerContent').style.display = 'flex';
          form.style.display = 'none';
          form.removeEventListener('submit', submitHandler);
          utilsForm.showCustomSuccessNotification(
            `Plantation réalisée avec succès !`
          );
        } catch (error) {
          console.error('Error creating area:', error.message);
          // Handle the error, e.g., show an error message to the user
        }
      };
      form.addEventListener('submit', submitHandler);
      utilsForm.backInitialForm(formId, form, submitHandler);
    }
  });
}

function sowedPlantedVegetableController(sowedPlantedVegetable, form, formId) {
  let previousQuantity = 0;
  let name = '';
  let variety;
  sowedPlantedVegetable.addEventListener('click', async () => {
    if (!(await utilsForm.checkIfSowingArea())) {
      document.getElementById('plantingVegetableForm').style.display = 'none';
      document.getElementById('managerContent').style.display = 'flex';
      utilsForm.showCustomFailNotification(
        'Aucun semi disponible pour la plantation'
      );
    } else if (!(await utilsForm.checkIfNoSowingArea())) {
      document.getElementById('plantingVegetableForm').style.display = 'none';
      document.getElementById('managerContent').style.display = 'flex';
      utilsForm.showCustomFailNotification(
        'Veuillez créer une zone de culture pour vos plantations'
      );
    } else {
      form.innerHTML = generatePlantingSowedVegetableFormContent();
      const vegetableSowedSelect = document.getElementById('vegetableSowed');
      const allVegetables = await vegetableManagerApi.getVegetableManager();
      const quantity = document.getElementById('plantingSowingQuantity');

      // Fetch sowingAreas and put them in select
      const areas = await areaApi.getAreas();
      const sowingAreas = areas.filter((area) => area.sowing_area === true);
      // Sort the areas array by name
      sowingAreas.sort((a, b) => a.name.localeCompare(b.name));
      const areaNameOptions = document.getElementById('sowingAreas');
      sowingAreas.forEach(function (area) {
        // Populate the dropdown with gardening area names
        const newAreaOption = document.createElement('option');
        newAreaOption.value = area.area_id;
        newAreaOption.text = area.name;
        areaNameOptions.add(newAreaOption);
      });

      // Put the vegetables corresponding to the first sowing area
      const defaultVegetableList = allVegetables.filter(
        (vegetable) => vegetable.area.area_id === sowingAreas[0].area_id
      );
      const defaultVegetableListSorted = defaultVegetableList.sort((a, b) => {
        if (a.sowing_date > b.sowing_date) {
          return 1;
        }
        return -1;
      });

      defaultVegetableListSorted.forEach(function (vegetable) {
        const newVegetableOption = document.createElement('option');
        newVegetableOption.value = vegetable.vegetable_manager_id;
        const sowingDate = new Date(vegetable.sowing_date);
        const formattedSowingDate = sowingDate.toLocaleDateString('fr-FR');
        newVegetableOption.innerHTML = `${vegetable.name} - ${vegetable.variety} (semi: ${formattedSowingDate})`;
        vegetableSowedSelect.add(newVegetableOption);
        const defaultQuantity = defaultVegetableList[0].quantity;
        previousQuantity = defaultQuantity;
        quantity.value = defaultQuantity;
        name = defaultVegetableList[0].name;
        variety = defaultVegetableList[0].variety;
      });

      // Add an event listener for the 'change' event on the 'sowingAreas' select element
      areaNameOptions.addEventListener('change', async () => {
        // Clear the options in the 'vegetableSowed' select element
        vegetableSowedSelect.innerHTML = '';
        quantity.value = '';
        // Get the selected area ID
        const selectedAreaId = areaNameOptions.value;
        const VegetableList = allVegetables.filter(
          (vegetable) => vegetable.area.area_id === selectedAreaId
        );
        const defaultVegetableListSorted = VegetableList.sort((a, b) => {
          if (a.sowing_date > b.sowing_date) {
            return 1;
          }
          return -1;
        });
        if (VegetableList) {
          defaultVegetableListSorted.forEach(function (vegetable) {
            const newVegetableOption = document.createElement('option');
            newVegetableOption.value = vegetable.vegetable_manager_id;
            const sowingDate = new Date(vegetable.sowing_date);
            const formattedSowingDate = sowingDate.toLocaleDateString('fr-FR');
            newVegetableOption.innerHTML = `${vegetable.name} - ${vegetable.variety} (semi: ${formattedSowingDate})`;
            vegetableSowedSelect.add(newVegetableOption);
            const defaultQuantity = defaultVegetableListSorted[0].quantity;
            previousQuantity = defaultQuantity;
            quantity.value = defaultQuantity;
            name = defaultVegetableListSorted[0].name;
            variety = defaultVegetableListSorted[0].variety;
          });
        }
      });

      const plantationAreas = areas.filter(
        (area) => area.sowing_area === false
      );
      // Sort the areas array by name
      sowingAreas.sort((a, b) => a.name.localeCompare(b.name));
      const plantationAreasSelect = document.getElementById('plantationArea');
      plantationAreas.forEach((area) => {
        const newPlantationAreaOption = document.createElement('option');
        newPlantationAreaOption.value = area.area_id;
        newPlantationAreaOption.text = area.name;
        plantationAreasSelect.add(newPlantationAreaOption);
      });

      vegetableSowedSelect.addEventListener('change', async () => {
        const selectedVegetableId = vegetableSowedSelect.value;
        const selectedVegetable = allVegetables.find(
          (vegetable) => vegetable.vegetable_manager_id === selectedVegetableId
        );

        // Set the quantity based on the selected vegetable
        if (selectedVegetable) {
          quantity.value = selectedVegetable.quantity || '';
          previousQuantity = selectedVegetable.quantity;
          name = selectedVegetable.name;
          variety = selectedVegetable.variety;
        }
      });

      const submitHandler = async (event) => {
        event.preventDefault();
        try {
          const today = new Date();
          const todayFormatted = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
          const data = utilsForm.getFormValues(formId);
          data['name'] = name;
          data['sowed'] = true;
          data['planted'] = true;
          data['planting_date'] =
            data['planting_date'] === ''
              ? todayFormatted
              : data['planting_date'];
          // Case if the quantity submited by the user are equal or more than the vegetable quantity:
          // => we do a put and change the area, and planting date:
          if (data['quantity'] >= previousQuantity) {
            data['quantity'] = previousQuantity;
            await vegetableManagerApi.updateVegetableManagerById(
              data['vegetable_manager_id'],
              data
            );
          } else {
            // Case if the quantity submited is less than the vegetable quantity:
            // we do a PUT to change the quantity of the vegetable and we POST a new
            // vegetable with the quantity submited, the new area, planting date
            data['variety'] = variety;
            await vegetableManagerApi.createVegetableManager(data);
            data['quantity'] = previousQuantity - data['quantity'];
            data['area'] = data['origin_area'];
            data['planted'] = false;
            data['planting_date'] = null;
            await vegetableManagerApi.updateVegetableManagerById(
              data['vegetable_manager_id'],
              data
            );
          }
          document.getElementById('managerContent').style.display = 'flex';
          form.style.display = 'none';
          form.removeEventListener('submit', submitHandler);
          utilsForm.showCustomSuccessNotification(
            `Plantation réalisée avec succès !`
          );
        } catch (error) {
          console.error('Error creating area:', error.message);
          // Handle the error, e.g., show an error message to the user
        }
      };
      form.addEventListener('submit', submitHandler);
      utilsForm.backInitialForm(formId, form, submitHandler);
    }
  });
}
