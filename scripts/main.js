// main.js

// Import modules
import { checkAuthentication } from './auth/auth.js';

import { initializeDateDisplay } from './utils/date-display.js';
import { initializeManagerModule } from './modules/manager/initialForm.js';
import { initializeEncyclopedia } from './pages/encyclopedia/vegetable101.js';
import { initializeVegetableInfoDetails } from './pages/encyclopedia/vegetable101_details.js';

import { displayToDo } from './modules/todoModule.js';
import { changePage } from './utils/change-page.js';
import { initializeForecast } from './modules/forecast.js';
import { initializeRecommandationModule } from './modules/recommandations.js';

import { assistantModuleSizeChanger } from './utils/AssistantModuleSizeChanger.js';

import { logOut } from './utils/log-out.js';

// Wait for the DOM to be fully loaded before running the initialization
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await checkAuthentication();
    initializeDateDisplay();
    // initializeForecast();
    initializeRecommandationModule();
    changePage();
    initializeManagerModule();
    await displayToDo();
    await initializeEncyclopedia();
    initializeVegetableInfoDetails();
    assistantModuleSizeChanger();
    logOut();
  } catch (error) {
    console.error(error.message);
  }
});
