// recommandations.js

import { getVegetableInfo } from '../api/vegetableInfoApi.js';

/**
 * Initializes the recommendation module by fetching and displaying vegetable information.
 */
export async function initializeRecommandationModule() {
  try {
    // Fetch and sort vegetable information
    const vegetables = await fetchAndSortVegetableInfo();

    // Get the recommendation module container
    const recommandationModule = document.getElementById(
      'recommandationModule'
    );

    // Render each vegetable in the recommendation module
    vegetables.forEach((vegetable) => {
      const vegetableContainer = createVegetableElement(vegetable);
      recommandationModule.appendChild(vegetableContainer);
    });
  } catch (error) {
    // Handle errors during initialization
    console.error('Error initializing recommendation module:', error.message);
  }
}

/**
 * Fetches vegetable information from the API, filters based on date criteria, and sorts the data.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of sorted vegetable information.
 * @throws {Error} Throws an error if there is an issue fetching or processing vegetable information.
 */
async function fetchAndSortVegetableInfo() {
  try {
    // Fetch vegetable information from the API
    const data = await getVegetableInfo();

    // Get the current date
    const currentDate = new Date();

    // Filter vegetable data based on date criteria
    const filteredData = data.filter((vegetable) =>
      isVegetableInSeason(vegetable, currentDate)
    );

    // Sort the filtered data by the start date of indoor planting
    filteredData.sort(
      (a, b) => new Date(a.start_indoor) - new Date(b.start_indoor)
    );

    // Then, sort by the end date of outdoor planting
    filteredData.sort((a, b) => new Date(a.end) - new Date(b.end));

    return filteredData;
  } catch (error) {
    // Throw an error if there is an issue with fetching or processing vegetable information
    throw new Error(
      'Error fetching and sorting vegetable information:',
      error.message
    );
  }
}

/**
 * Checks if a vegetable is in season based on date criteria.
 * @param {Object} vegetable - The vegetable information.
 * @param {Date} currentDate - The current date.
 * @returns {boolean} True if the vegetable is in season, false otherwise.
 */
function isVegetableInSeason(vegetable, currentDate) {
  const startDate = vegetable.start_indoor
    ? new Date(vegetable.start_indoor)
    : new Date(vegetable.start_outdoor);
  const outdoorEndDate = new Date(vegetable.end);
  return startDate < currentDate && outdoorEndDate > currentDate;
}

/**
 * Creates a DOM element for a vegetable and sets its background image.
 * @param {Object} vegetable - The vegetable information.
 * @returns {HTMLDivElement} The created vegetable container element.
 */
function createVegetableElement(vegetable) {
  // Create a div element for the vegetable container
  const vegetableContainer = document.createElement('div');
  vegetableContainer.className = 'recommandations-container';

  // Create a paragraph element for the vegetable name
  const vegetableName = document.createElement('p');
  vegetableName.textContent = vegetable.name;
  vegetableName.className = 'recommandations-container__vegetable-name';

  // Generate the URL for the vegetable image
  const vegetableNameWithoutSpaces = vegetable.name.replace(/\s/g, '');
  const imgUrl = `url(./styles/assets/vegetable_icons/${vegetableNameWithoutSpaces}.png)`;

  // Set the background image of the vegetable container
  vegetableContainer.style.backgroundImage = imgUrl;

  // Append the vegetable name to the vegetable container
  vegetableContainer.appendChild(vegetableName);

  return vegetableContainer;
}
