export function generateIndirectSowingVegetableFormContent() {
  return `
<div class="form-container__back-button" id="backFormButton"></div>
<div class="form-container__icon form-container__icon--indirect-sowing"></div>
<h3 class="form-container__title">Faire un semi en pot</h3>
<form class="form-container__form">

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="areaName">Que voulez-vous semer ?*</label>
<select class="form-container__form__field__select" type="text" id="vegetableIndirectSowingNameSelect" name="name">
</select>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="vegetableVariety">Indiquez la variété</label>
<input class="form-container__form__field__input form-container__form__field__input--text" type="text" id="vegetableVariety" name="variety" maxlength="60"
  >
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="quantity">Quantité</label>
<input class="form-container__form__field__input form-container__form__field__input--number" type="number" id="quantity" name="quantity"
  step="1" min="0" max="10000" required value=1>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="vegetableName">Choisissez la zone de culture</label>
<select class="form-container__form__field__select" type="text" id="vegetableDirectSowingAreaSelect" name="area">
</select>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="vegetableName">Entrez la date du semi</label>
<input class="form-container__form__field__select" type="date" id="vegetableDirectSowingDate" name="sowing_date">
</div>


<div class="form-container__form__field">
<button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Créer</button>
</div>
</form>
`;
}
