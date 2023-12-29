export function generateHarvestVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--harvest"></div>
  <h3 class="form-container__title">Récolter</h3>
  <form class="form-container__form">
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Sélectionnez une zone de culture</label>
      <select class="form-container__form__field__select" type="text" id="harvestAreaSelect" name="area">
      </select>
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Que voulez-vous récolter</label>
      <select class="form-container__form__field__select" type="text" id="harvestVegetableSelect" name="vegetable_manager_id">
      </select>
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="quantity">Quantité (unité de votre choix)</label>
      <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="harvestVegetableQuantity" name="harvest_quantity"
        step="0.1" min="0" max="10000">
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="vegetableName">Entrez la date de récolte </label>
      <input class="form-container__form__field__select" type="date" id="harvestVegetableDate" name="harvest_date">
    </div>

    <div class="form-container__form__field">
      <button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Récolter</button>
    </div>
  </form>
  `;
}
