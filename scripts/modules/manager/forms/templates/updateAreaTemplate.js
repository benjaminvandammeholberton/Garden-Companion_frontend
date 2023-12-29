export function generateUpdateAreaFormContent() {
  // This function generates the content for the Add Area form
  return `
  <div class="form-container__back-button" id="backFormButton"></div>

  <div class="form-container__icon form-container__icon--update-area"></div>

  <h3 class="form-container__title">Modifier une zone de culture</h3>
  
  <form class="form-container__form">
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Sélectionner un espace</label>
      <select class="form-container__form__field__select" type="text" id="areaUpdateNameSelect" name="area_id">
      </select>
    </div>
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Nouveau nom</label>
      <input class="form-container__form__field__input form-container__form__field__input--text" type="text" id="areaNewName" name="name" maxlength="24">
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaSurface">Nouvelle surface (en m²)</label>
      <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="areaNewSurface" name="surface"
        step="0.1" min="0" max="10000">
    </div>

    <div class="form-container__form__field">
    <label class="form-container__form____field__label">Souhaitez-vous réserver cet espace pour vos semis en pot ?</label>
    <div class="row-input">
      <div class="form-container__form__field__radio">
        <input type="radio" id="reservationUpdateYes" name="sowing_area" value="true">
        <label for="reservationUpdateYes">Oui</label>
      </div>
      <div class="form-container__form__field__radio">
        <input type="radio" id="reservationUpdateNo" name="sowing_area" value="false">
        <label for="reservatioUpdatenNo">Non</label>
      </div>
    </div>
  </div>

    <div class="form-container__form__field">
      <button class="form-container__form__field__button form-container__form__field__button--update" type="submit">Modifier</button>
    </div>
    
  </form>
  `;
}
