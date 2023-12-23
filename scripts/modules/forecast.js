import * as forecastApi from '../api/forecastApi.js';

export async function initializeForecast() {
  const location = localStorage.getItem('location');
  if (location) {
    const forecastData = await getForecastDataFromLocalStorage();
    displayForecast(forecastData);
  } else {
    displayLocationSelection();
  }
}

function displayForecast(forecastData) {
  const forecastModule = document.getElementById('forecastModule');

  // Add location button to change the forecast location
  const changeLocationButton = document.createElement('div');
  changeLocationButton.className = 'forecast__change-location-button';
  changeLocationButton.setAttribute('data-label', 'Nouvelle localisation');
  forecastModule.appendChild(changeLocationButton);

  // Add the name of the localisation
  const locationNameDisplay = document.createElement('div');
  locationNameDisplay.className = 'forecast__change-location-name';
  locationNameDisplay.textContent = localStorage.getItem('location');
  forecastModule.appendChild(locationNameDisplay);

  // Add event listener to change the location
  changeLocationButton.addEventListener('click', () => {
    localStorage.removeItem('location');
    forecastModule.innerHTML = '';
    initializeForecast();
  });

  // Extract and display the weather for the next 4 days
  const dailyForecasts = forecastData.daily.slice(0, 4); // Get data for the next 4 days (including the current day)

  dailyForecasts.forEach((dayData, index) => {
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');

    const dayElement = document.createElement('p');
    dayElement.classList.add('forecast-container__day');
    if (index === 0) {
      dayElement.textContent = 'auj.';
    } else {
      dayElement.textContent = getDayFromTimestamp(dayData.dt);
    }

    forecastContainer.appendChild(dayElement);

    const iconElement = document.createElement('img');
    iconElement.classList.add('forecast-container__icon');
    iconElement.src = getIconURL(dayData.weather[0].description);
    forecastContainer.appendChild(iconElement);

    const temperatureElement = document.createElement('p');
    temperatureElement.classList.add('forecast-container__temperature');
    temperatureElement.textContent = `${(dayData.temp.min - 273.15).toFixed(
      0
    )}°/${(dayData.temp.max - 273.15).toFixed(0)}°`;
    forecastContainer.appendChild(temperatureElement);

    const rainElement = document.createElement('p');
    rainElement.classList.add('forecast-container__rain');
    rainElement.textContent = `${(dayData.rain || 0).toFixed(1)}`;
    const spanElement = document.createElement('span');
    spanElement.textContent = 'mm';
    rainElement.appendChild(spanElement);
    forecastContainer.appendChild(rainElement);

    document
      .querySelector('.dashbord__module__content--forecast')
      .appendChild(forecastContainer);

    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('forecast-tooltip');
    document.body.appendChild(tooltip);

    // Attach event listeners to the icons to show and hide the tooltip
    const iconElements = document.querySelectorAll('.forecast-container__icon');

    iconElements.forEach((iconElement, index) => {
      iconElement.addEventListener('mouseenter', (event) => {
        // Get the corresponding day's weather data
        const dayData = dailyForecasts[index];
        const description = dayData.weather[0].description;

        // Set the content of the tooltip using the French translations
        const frenchDescription = getFrenchDescription(description);
        tooltip.innerHTML = `<p>${frenchDescription}</p>`;

        // Position the tooltip below the icon
        const iconRect = iconElement.getBoundingClientRect();
        tooltip.style.left = `${iconRect.left + window.scrollX}px`;
        tooltip.style.top = `${iconRect.bottom + window.scrollY}px`;

        // Show the tooltip
        tooltip.style.display = 'block';
      });

      iconElement.addEventListener('mouseleave', () => {
        // Hide the tooltip when the mouse leaves the icon
        tooltip.style.display = 'none';
      });
    });
  });
  // Function to get the day from a timestamp
  function getDayFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('fr-FR', { weekday: 'short' });
  }

  // Function to get the icon URL based on the description
  function getIconURL(description) {
    // Create a mapping of descriptions to icons
    const descriptionToIcon = {
      'moderate rain': 'icon-rain.png',
      'light rain': 'icon-sun_rain.png',
      'heavy intensity rain': 'icon-heavy_rain.png',
      'clear sky': 'icon-sun.png',
      'few clouds': 'icon-few-cloud.png',
      'scattered clouds': 'icon-few-cloud.png',
      'overcast clouds': 'icon-few-cloud.png',
      'broken clouds': 'icon-few-cloud.png',
      fog: 'icon-fog.png',
      // Add more descriptions and their corresponding icons here
    };

    // Check if the description exists in the mapping
    if (descriptionToIcon.hasOwnProperty(description)) {
      return `./styles/assets/${descriptionToIcon[description]}`;
    } else {
      // Handle the case where the description is not in the mapping or provide a default icon
      return './styles/assets/icon_carrot.png'; // Replace with your default icon
    }
  }
  // Function to get the French description based on the English description
  function getFrenchDescription(description) {
    const descriptionTranslations = {
      'moderate rain': 'pluie modérée',
      'light rain': 'pluie légère',
      'heavy intensity rain': 'pluie intense',
      'clear sky': 'ciel dégagé',
      'few clouds': 'quelques nuages',
      'scattered clouds': 'nuages épars',
      'overcast clouds': 'ciel couvert',
      'broken clouds': 'nuages fragmentés',
      fog: 'brouillard',
      // Add more translations as needed
    };

    return descriptionTranslations[description] || description;
  }
}

function displayLocationSelection() {
  // Generate the location selection form
  const forecastModule = document.getElementById('forecastModule');
  forecastModule.innerHTML = generateLocationForm();
  const forecastForm = document.getElementById('forecastForm');

  // Add event listener to the submit postcode button
  forecastForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Empty the select city field if the user want to enter another postcode
    const cityField = document.getElementById('cityField');
    cityField.innerHTML = '';

    // Get the list of cities by postcode
    if (event.submitter.id === 'forecastPostCodeSubmit') {
      const postCodeField = document.getElementById('forecastPostCode');
      const postCode = postCodeField.value;
      const cities = await getCitiesByPostCode(postCode); //call the api

      // Add select field et submit button below the postcode field input
      const cityInput = document.createElement('select');
      cityInput.classList.add('forecast__location-form__select');
      cityField.appendChild(cityInput);
      const submitCityButton = document.createElement('button');
      submitCityButton.id = 'forecastCitySubmit';
      submitCityButton.className = 'forecast__location-form__cityButton';
      cityField.appendChild(submitCityButton);

      // Fill the select field
      cities.forEach((city) => {
        const cityOption = document.createElement('option');
        cityOption.text = city.placeName;
        cityInput.appendChild(cityOption);
      });

      // Add event listener to the submit city button
      submitCityButton.addEventListener('click', () => {
        // Get the name of the selected city
        const selectedCity = cityInput.value;

        // Look into the cities list to get the lattitude and longitude
        // and store the information the local storage
        cities.forEach(async (city) => {
          if (city.placeName === selectedCity) {
            const longitude = city.lng;
            const latitude = city.lat;
            localStorage.setItem('location', selectedCity);
            localStorage.setItem('longitude', longitude);
            localStorage.setItem('latitude', latitude);

            // get the forecast data by calling the API
            const forecastData = await getForecastDataFromApi();

            // empty the container and display the forecast
            forecastModule.innerHTML = '';
            displayForecast(forecastData);
          }
        });
      });
    }
  });
}

async function getForecastDataFromLocalStorage() {
  const forecastData = JSON.parse(localStorage.getItem('forecastData'));
  if (forecastData) {
    if (await compareForecastDataDateWithTodayDate(forecastData)) {
      return forecastData;
    } else {
      return await getForecastDataFromApi();
    }
  }
}

function compareForecastDataDateWithTodayDate(forecastData) {
  let timestamp = forecastData.current.dt;

  // Convert Unix timestamp to milliseconds
  let timestampMillis = timestamp * 1000;

  // Create a new Date object using the timestamp in milliseconds
  let dateFromTimestamp = new Date(timestampMillis);

  // Specify the France timezone (Central European Time, CET)
  let franceTimezone = 'Europe/Paris';

  // Create a new Date object adjusted to the France timezone
  let dateInFrance = new Date(
    dateFromTimestamp.toLocaleString('en-US', { timeZone: franceTimezone })
  );

  // Get individual date components from the timestamp in France timezone
  let yearFrance = dateInFrance.getFullYear();
  let monthFrance = dateInFrance.getMonth() + 1; // Month is zero-based
  let dayFrance = dateInFrance.getDate();

  // Create a new Date object with the current date and time in France timezone
  let todayInFrance = new Date().toLocaleString('en-US', {
    timeZone: franceTimezone,
  });

  // Get individual date components for today in France timezone
  let yearTodayFrance = new Date(todayInFrance).getFullYear();
  let monthTodayFrance = new Date(todayInFrance).getMonth() + 1; // Month is zero-based
  let dayTodayFrance = new Date(todayInFrance).getDate();

  // Compare the dates
  if (
    yearTodayFrance === yearFrance &&
    monthTodayFrance === monthFrance &&
    dayTodayFrance === dayFrance
  ) {
    return true;
  } else {
    return false;
  }
}

async function getForecastDataFromApi() {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');
  const forecastData = await forecastApi.getForecast(latitude, longitude);
  localStorage.setItem('forecastData', JSON.stringify(forecastData));
  return forecastData;
}

function generateLocationForm() {
  return `
  <form id="forecastForm" class="forecast__location-form">
    <div class="forecast__location-form__field">
      <input class="forecast__location-form__input" id="forecastPostCode" type="text" 
      name="postCode" maxlength="10" placeholder="Code postal" required>
      <button id="forecastPostCodeSubmit" class="forecast__location-form__postCodeButton"></button>
    </div>
    <div class="forecast__location-form__field" id="cityField">

    </div>
  </form>
  `;
}

async function getCitiesByPostCode(postCode) {
  const data = await forecastApi.getCities(postCode);
  const cities = data['postalCodes'];
  let citiesFr = [];
  cities.forEach((city) => {
    if (city.countryCode === 'FR') {
      citiesFr.push(city);
    }
  });
  return citiesFr;
}
