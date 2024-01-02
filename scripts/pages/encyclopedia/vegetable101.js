// vegetableEncyclopedia.js

import { getVegetableInfo } from '../../api/vegetableInfoApi.js';

/**
 * Initializes the vegetable encyclopedia by fetching and displaying vegetable information.
 */
export async function initializeEncyclopedia() {
  try {
    // Fetch vegetable information from the API
    const data = await getVegetableInfo();

    // Sort the vegetable data alphabetically by name
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

    // Get the container element to display all vegetables
    const container = document.getElementById('allVegetablesInfos');

    // Render each vegetable in the encyclopedia
    sortedData.forEach((element) => {
      const item = createItemElement(element);
      container.appendChild(item);
    });
  } catch (error) {
    // Handle errors during initialization
    console.error('Error initializing vegetable encyclopedia:', error.message);
  }
}

/**
 * Creates a subtitle element with the specified text.
 * @param {string} text - The text content of the subtitle.
 * @returns {HTMLDivElement} The created subtitle element.
 */
function createSubtitleElement(text) {
  const subtitle = document.createElement('div');
  subtitle.className = 'allVegetables__subtitle';
  subtitle.textContent = text;
  return subtitle;
}

/**
 * Creates a container element for grouping vegetable items.
 * @returns {HTMLDivElement} The created container element.
 */
function createContainerElement() {
  const container = document.createElement('div');
  container.className = 'allVegetables__container';
  return container;
}

/**
 * Creates an item element for a vegetable with its details.
 * @param {Object} vegetable - The vegetable information.
 * @returns {HTMLDivElement} The created item element.
 */
function createItemElement(vegetable) {
  const item = document.createElement('div');
  item.className = 'allVegetables__item';

  // Set background image based on vegetable name
  //   const vegetableNameWithoutSpacesRaw = vegetable.name.replace(/\s/g, '');
  // const vegetableNameWithoutSpaces =
  let vegetableNameWithoutSpaces = encodeURIComponent(vegetable.name);
  vegetableNameWithoutSpaces = vegetable.name.replace(/\s/g, '');
  const imgUrl = `url(./styles/assets/vegetable_icons/${vegetableNameWithoutSpaces}.png)`;
  item.style.backgroundImage = imgUrl;

  // Create a span for displaying the vegetable name
  const nameSpan = document.createElement('span');
  nameSpan.textContent = vegetable.name;
  item.appendChild(nameSpan);
  // Set attributes for additional vegetable details
  item.setAttribute('id', vegetable.id);
  item.setAttribute('name', vegetable.name);
  item.setAttribute('family', vegetable.category);
  item.setAttribute('start_indoor', vegetable.start_indoor);
  item.setAttribute('start_outdoor', vegetable.start_outdoor);
  item.setAttribute('end', vegetable.end);
  item.setAttribute('water_needs', vegetable.water_needs);
  item.setAttribute('cold_resistance', vegetable.cold_resistance);
  item.setAttribute('spacing_on_row', vegetable.spacing_on_row);
  item.setAttribute('soil_temperature', vegetable.soil_temperature);
  item.setAttribute('description', vegetable.description);

  return item;
}
