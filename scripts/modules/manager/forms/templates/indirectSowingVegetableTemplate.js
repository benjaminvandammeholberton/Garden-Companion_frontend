export function generateIndirectSowingVegetableFormContent() {
  return `
<div class="form-container__back-button" id="backFormButton"></div>
<div class="form-container__icon form-container__icon--indirect-sowing"></div>
<h3 class="form-container__title">Faire un semi en pot</h3>
<form class="form-container__form">

<div class="form-container__form__field" id="form-indirect-sowing-vegetable-name">
<label class="form-container__form____field__label">Que voulez-vous semer ?*</label>
<select class="form-container__form__field__select" type="text" id="vegetableIndirectSowingNameSelect" name="name">
</select>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label">Variété ou nom distinctif*</label>
<input class="form-container__form__field__input form-container__form__field__input--text" type="text" name="variety" maxlength="60" placeholder="ex. Variété (Groupe 1)" required>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label">Quantité</label>
<input class="form-container__form__field__input form-container__form__field__input--number" type="number" name="quantity"
  step="1" min="0" max="10000" required value=1>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label" for="vegetableName">Choisissez l'espace de semis</label>
<select class="form-container__form__field__select" type="text" id="vegetableIndirectSowingAreaSelect" name="area">
</select>
</div>

<div class="form-container__form__field">
<label class="form-container__form____field__label">Entrez la date du semi</label>
<input class="form-container__form__field__select" type="date" name="sowing_date">
</div>


<div class="form-container__form__field">
<button class="form-container__form__field__button form-container__form__field__button--create" type="submit">Semer</button>
</div>
</form>
`;
}
