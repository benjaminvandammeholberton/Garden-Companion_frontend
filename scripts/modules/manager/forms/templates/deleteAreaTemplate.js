export function generateDeleteAreaFormContent() {
  // This function generates the content for the Add Area form
  return `
  <div class="form-container__back-button" id="backFormButton"></div>

  <div class="form-container__icon form-container__icon--delete-area"></div>

  <h3 class="form-container__title">Supprimer une zone de culture</h3>
  
  <form class="form-container__form">
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Sélectionner un espace</label>
      <select class="form-container__form__field__select" type="text" id="areaDeleteNameSelect" name="area_id" required>
      </select>
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label">Attention, toutes les plantes et semis associés à cet espace seront également supprimés</label>
      <div class="form-container__form__field__checkbox">
      <input type="checkbox" required>
      <label for="reservation"></label>
    </div>
    </div>

    <div class="form-container__form__field">
      <button class="form-container__form__field__button form-container__form__field__button--delete" type="submit">Supprimer</button>
    </div>
    
  </form>
  `;
}
