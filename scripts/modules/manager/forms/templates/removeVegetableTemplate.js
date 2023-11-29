export function generateRemoveVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--remove"></div>
  <h3 class="form-container__title">On fait de la place !</h3>
  <form class="form-container__form">
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Que voulez-vous semer ?</label>
      <select class="form-container__form__field__select" type="text" id="areaUpdateNameSelect" name="name">
      </select>
    </div>
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="vegetableVariety">Indiquer la variété</label>
      <input class="form-container__form__field__input form-container__form__field__input--text" type="text" id="vegetableVariety" name="variety" maxlength="60"
        required>
    </div>
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="quantity">Quantité</label>
      <input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="quantity" name="quantity"
        step="1" min="0" max="10000" required value=data.surface>
    </div>
  
    <div class="form-container__form__field">
      <label class="form-container__form____field__label" for="areaName">Choisissez la zone de semis</label>
      <select class="form-container__form__field__select" type="text" id="areaUpdateNameSelect" name="name">
      </select>
    </div>
  
    <div class="form-container__form__field">
      <button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Créer</button>
    </div>
  </form>
  `;
}
