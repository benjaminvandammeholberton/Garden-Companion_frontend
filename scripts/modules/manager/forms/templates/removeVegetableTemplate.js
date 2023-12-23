export function generateRemoveVegetableFormContent() {
  return `
  <div class="form-container__back-button" id="backFormButton"></div>
  <div class="form-container__icon form-container__icon--remove"></div>
  <h3 class="form-container__title">Fin de culture</h3>
  <form class="form-container__form">
  
  <div class="form-container__form__field">
    <label class="form-container__form____field__label" for="areaName">Sélectionnez une zone de culture</label>
    <select class="form-container__form__field__select" type="text" id="removeAreaSelect" name="area">
    </select>
  </div>

<div class="form-container__form__field">
  <label class="form-container__form____field__label" for="areaName">Que voulez-vous retirer</label>
  <select class="form-container__form__field__select" type="text" id="removeVegetableSelect" name="vegetable_manager_id">
  </select>
</div>

<div class="form-container__form__field">
  <label class="form-container__form____field__label" for="vegetableName">Entrez la date de fin de culture</label>
  <input class="form-container__form__field__select" type="date" id="removeVegetableDate" name="remove_date">
</div>

<div class="form-container__form__field">
  <button class="form-container__form__field__button form-container__form__field__button--delete" type="submit">Retirer</button>
</div>
</form>
`;
}
