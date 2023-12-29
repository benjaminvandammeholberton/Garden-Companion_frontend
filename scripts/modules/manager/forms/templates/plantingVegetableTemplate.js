export function generatePlantingVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButtonPlanting"></div>
  <div class="form-container__icon form-container__icon--planting"></div>
  <h3 class="form-container__title">Planter</h3>
  <form class="form-container__form">
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label">Sélectionnez l'origine du plant</label>
      <div class="row-input">
        <div class="form-container__form__field__radio">
          <input type="radio" id="sowingSpaceOrigin" name="plantOrigin" required>
          <label for="sowingSpaceOrigin">Espace semis</label>
        </div>
        <div class="form-container__form__field__radio">
          <input type="radio" id="newOrigin" name="plantOrigin" required>
          <label for="newOrigin">Nouveau plant</label>
        </div>
      </div>
    </div>
  </form>
  `;
}

export function generatePlantingNewVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--planting"></div>
  <h3 class="form-container__title">Planter</h3>
  <form class="form-container__form">
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label">Que voulez-vous planter ?*</label>
  <select class="form-container__form__field__select" type="text" id="vegetableDirectPlantingNameSelect" name="name">
  </select>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableVariety">Variété ou nom distinctif*</label>
  <input class="form-container__form__field__input form-container__form__field__input--text" type="text" id="vegetableVariety" name="variety" maxlength="60" placeholder="ex. Variété (Groupe 1)" required>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="quantity">Quantité</label>
  <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="quantity" name="quantity"
    step="1" min="1" max="10000" required value=1>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableName">Choisissez la zone de culture</label>
  <select class="form-container__form__field__select" type="text" id="vegetableDirectPlantingAreaSelect" name="area">
  </select>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableName">Entrez la date de plantation</label>
  <input class="form-container__form__field__select" type="date" id="vegetableDirectSowingDate" name="planting_date">
  </div>
  
  
  <div class="form-container__form__field">
  <button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Planter</button>
  </div>
  </form>`;
}

export function generatePlantingSowedVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--planting"></div>
  <h3 class="form-container__title">Planter</h3>
  <form class="form-container__form">
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="areaName">Sélectionnez l'espace de semis*</label>
  <select class="form-container__form__field__select" type="text" id="sowingAreas" name="origin_area">
  </select>
  </div>

  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="areaName">Sélectionnez le semi</label>
  <select class="form-container__form__field__select" type="text" id="vegetableSowed" name="vegetable_manager_id">
  </select>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="quantity">Quantité</label>
  <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="plantingSowingQuantity" name="quantity"
    step="1" min="0" max="10000" required>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableName">Sélectionnez la zone de plantation</label>
  <select class="form-container__form__field__select" type="text" id="plantationArea" name="area">
  </select>
  </div>
  
  <div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableName">Entrez la date du semi</label>
  <input class="form-container__form__field__select" type="date" id="vegetableDirectSowingDate" name="planting_date">
  </div>
  
  
  <div class="form-container__form__field">
  <button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Planter</button>
  </div>
  </form>`;
}
