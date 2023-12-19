export function generateCreateAreaFormContent() {
  // This function generates the content for the Add Area form
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--create-area"></div>
  <h3 class="form-container__title">Ajouter une zone de culture</h3>
  <form class="form-container__form">

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Nom du nouvel espace</label>
      <input class="form-container__form__field__input form-container__form__field__input--text" type="text" id="areaName" name="name" maxlength="24"
        required>
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaSurface">Surface (en m²)</label>
      <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="areaUpdateSurface" name="surface"
        step="0.01" min="0" max="10000" required>
    </div>

    <div class="form-container__form__field">
      <label class="form-container__form____field__label">Souhaitez-vous réserver cet espace pour vos semis en pot ?</label>
      <div class="row-input">
        <div class="form-container__form__field__radio">
          <input type="radio" id="reservationCreateAreaYes" name="sowing_area" value="true" required>
          <label for="reservationCreateAreaYes">Oui</label>
        </div>
        <div class="form-container__form__field__radio">
          <input type="radio" id="reservationCreateAreaNo" name="sowing_area" value="false" required>
          <label for="reservationCreateAreaNo">Non</label>
        </div>
      </div>
    </div>

    <div class="form-container__form__field">
      <button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Créer</button>
    </div>
  </form>
  `;
}
