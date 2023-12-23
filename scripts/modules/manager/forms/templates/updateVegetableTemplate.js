export function generateUpdateVegetableFormContent() {
  return `
<div class="form-container__back-button" id="backFormButton"></div>
<div class="form-container__icon form-container__icon--update"></div>
<h3 class="form-container__title">Supprimer</h3>
<form class="form-container__form">

  <div class="form-container__form__field">
    <label class="form-container__form____field__label">Sélectionnez une zone de culture</label>
    <select class="form-container__form__field__select" type="text" id="updateVegetableAreaSelect" name="area">
    </select>
  </div>

  <div class="form-container__form__field">
    <label class="form-container__form____field__label"">Sélectionnez le(s) plant(s)</label>
    <select class="form-container__form__field__select" type="text" id="updateVegetableSelect" name="vegetable_manager_id">
    </select>
  </div>

  <div class="form-container__form__field">
    <label class="form-container__form____field__label">Nombre de plants à supprimer</label>
    <input class="form-container__form__field__input form-container__form__field__input--number" id="updateQantity" type="number" name="quantity"
  step="1" min="0" max="10000" required>
  </div>

  <div class="form-container__form__field--updateVegetableSubmit">
    <button class="form-container__form__field__button form-container__form__field__button--delete" type="submit">Supprimer</button>
  </div>

  
</form>
`;
}
