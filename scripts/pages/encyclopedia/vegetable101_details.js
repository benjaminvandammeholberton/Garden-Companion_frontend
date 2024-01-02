export function initializeVegetableInfoDetails() {
  const all_vegetables = document.getElementById('container_allVegetables');
  const detail_page = document.getElementById('container_vegetableInfos');

  all_vegetables.addEventListener('click', (event) => {
    if (event.target.classList.contains('allVegetables__item')) {
      const vegetableItem = event.target;
      const vegetableName = vegetableItem
        .getAttribute('name')
        .replace(/\s/g, '');
      const options = { day: 'numeric', month: 'long' };

      let vegetableStart_indoor = 'N/A';
      if (vegetableItem.getAttribute('start_indoor') !== 'null') {
        const vegetableStart_indoor_raw = new Date(
          vegetableItem.getAttribute('start_indoor')
        );
        vegetableStart_indoor = vegetableStart_indoor_raw.toLocaleDateString(
          'fr-FR',
          options
        );
      }

      const vegetableStart_outdoor_raw = new Date(
        vegetableItem.getAttribute('start_outdoor')
      );
      const vegetableStart_outoor =
        vegetableStart_outdoor_raw.toLocaleDateString('fr-FR', options);
      const vegetableEnd_raw = new Date(vegetableItem.getAttribute('end'));
      const vegetableEnd = vegetableEnd_raw.toLocaleDateString(
        'fr-FR',
        options
      );
      const vegetableCold_resistance =
        vegetableItem.getAttribute('cold_resistance');
      const vegetableWater_needs = vegetableItem.getAttribute('water_needs');
      const vegetableSpacing_on_raw =
        vegetableItem.getAttribute('spacing_on_row');
      const vegetableSoil_temperature =
        vegetableItem.getAttribute('soil_temperature');

      const title = document.createElement('h2');
      title.textContent = vegetableItem.getAttribute('name');

      const header = document.createElement('div');
      header.classList = 'vegetable-characteristic__header';

      const vegetablePicture = document.createElement('img');
      vegetablePicture.src = `./styles/assets/vegetables_pictures/${vegetableName}.jpg`;

      const headerContent = document.createElement('div');
      headerContent.classList =
        'vegetable-characteristic__header__text-content';

      const vegetableFamily = document.createElement('h3');
      vegetableFamily.textContent = `Catégorie: ${vegetableItem.getAttribute(
        'family'
      )}`;

      const vegetableDescription = document.createElement('p');
      vegetableDescription.textContent = `${vegetableItem.getAttribute(
        'description'
      )}`;

      const quickInfos = document.createElement('div');
      quickInfos.classList = 'vegetable-characteristic__quick-infos';

      const quickInfosSow = document.createElement('div');
      quickInfosSow.classList = 'vegetable-characteristic__sow-infos';

      // Spacing on row
      const quickInfosSpacingOnRow = document.createElement('div');
      quickInfosSpacingOnRow.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--spacing-on-row';
      const quickInfosSpacingOnRowTitle = document.createElement('div');
      quickInfosSpacingOnRowTitle.textContent = 'Espacement entre plants';
      quickInfosSpacingOnRowTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosSpacingOnRowContent = document.createElement('div');
      quickInfosSpacingOnRowContent.innerHTML = `<em>minimum</em>${vegetableSpacing_on_raw} cm`;
      quickInfosSpacingOnRowContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Germination temperature
      const quickInfossoilTemperature = document.createElement('div');
      quickInfossoilTemperature.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--soil-temperature';
      const quickInfossoilTemperatureTitle = document.createElement('div');
      quickInfossoilTemperatureTitle.textContent = 'T° de germination';
      quickInfossoilTemperatureTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfossoilTemperatureContent = document.createElement('div');
      quickInfossoilTemperatureContent.innerHTML = `<em>minimum</em>${vegetableSoil_temperature}°C`;
      quickInfossoilTemperatureContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Water needs
      const quickInfosWaterNeeds = document.createElement('div');
      quickInfosWaterNeeds.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--watering';
      const quickInfosWaterNeedsTitle = document.createElement('div');
      quickInfosWaterNeedsTitle.textContent = 'Besoins en eau';
      quickInfosWaterNeedsTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosWaterNeedsContent = document.createElement('div');
      if (vegetableWater_needs === '1') {
        quickInfosWaterNeedsContent.innerHTML = `<em>arrosage</em>léger`;
      } else if (vegetableWater_needs === '2') {
        quickInfosWaterNeedsContent.innerHTML = `<em>arrosage</em>régulier`;
      } else {
        quickInfosWaterNeedsContent.innerHTML = `<em>arrosage</em>fréquent`;
      }
      quickInfosWaterNeedsContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Frost resistance
      const quickInfosFrost = document.createElement('div');
      quickInfosFrost.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--frost';
      const quickInfosFrostTitle = document.createElement('div');
      quickInfosFrostTitle.textContent = 'Résistance au gel';
      quickInfosFrostTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosFrostContent = document.createElement('div');
      if (vegetableCold_resistance === '0') {
        quickInfosFrostContent.innerHTML = `<em>non tolérant</em>> 0°`;
      } else if (vegetableCold_resistance === '1') {
        quickInfosFrostContent.innerHTML = `<em>semi tolérant</em>≈ -2°`;
      } else {
        quickInfosFrostContent.innerHTML = `<em>tolérant</em>< -2°`;
      }
      quickInfosFrostContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Start inside
      const quickInfosStartInside = document.createElement('div');
      quickInfosStartInside.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--start-inside';
      const quickInfosStartInsideTitle = document.createElement('div');
      quickInfosStartInsideTitle.textContent = 'Semi intérieur';
      quickInfosStartInsideTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosStartInsideContent = document.createElement('div');
      quickInfosStartInsideContent.innerHTML = `<em>à partir du</em>${vegetableStart_indoor}`;
      quickInfosStartInsideContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Transplant
      const quickInfosStartOutside = document.createElement('div');
      quickInfosStartOutside.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--start-outside';
      const quickInfosStartOutsideTitle = document.createElement('div');
      quickInfosStartOutsideTitle.textContent = 'Semi extérieur';
      quickInfosStartOutsideTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosStartOutsideContent = document.createElement('div');
      quickInfosStartOutsideContent.innerHTML = `<em>à partir du</em>${vegetableStart_outoor}`;
      quickInfosStartOutsideContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      // Stop sowing
      const quickInfosEnd = document.createElement('div');
      quickInfosEnd.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--end';
      const quickInfosEndTitle = document.createElement('div');
      quickInfosEndTitle.textContent = 'Dernier semi';
      quickInfosEndTitle.className =
        'vegetable-characteristic__quick-infos__item__title';
      const quickInfosEndContent = document.createElement('div');
      quickInfosEndContent.innerHTML = `<em>jusqu'au</em>${vegetableEnd}`;
      quickInfosEndContent.className =
        'vegetable-characteristic__quick-infos__item__content';

      const tableLegendItemStartOutsideData = document.createElement('div');
      tableLegendItemStartOutsideData.classList =
        'vegetable-characteristic__legend__item__data';
      tableLegendItemStartOutsideData.textContent = detail_page.innerHTML = '';

      detail_page.appendChild(title);
      detail_page.appendChild(header);
      header.appendChild(vegetablePicture);
      header.appendChild(headerContent);
      headerContent.appendChild(vegetableFamily);
      headerContent.appendChild(vegetableDescription);
      detail_page.appendChild(quickInfos);

      quickInfos.appendChild(quickInfosSpacingOnRow);
      quickInfosSpacingOnRow.appendChild(quickInfosSpacingOnRowTitle);
      quickInfosSpacingOnRow.appendChild(quickInfosSpacingOnRowContent);

      quickInfos.appendChild(quickInfossoilTemperature);
      quickInfossoilTemperature.appendChild(quickInfossoilTemperatureTitle);
      quickInfossoilTemperature.appendChild(quickInfossoilTemperatureContent);

      quickInfos.appendChild(quickInfosWaterNeeds);
      quickInfosWaterNeeds.appendChild(quickInfosWaterNeedsTitle);
      quickInfosWaterNeeds.appendChild(quickInfosWaterNeedsContent);

      quickInfos.appendChild(quickInfosFrost);
      quickInfosFrost.appendChild(quickInfosFrostTitle);
      quickInfosFrost.appendChild(quickInfosFrostContent);

      detail_page.appendChild(quickInfosSow);

      quickInfosSow.appendChild(quickInfosStartInside);
      quickInfosStartInside.appendChild(quickInfosStartInsideTitle);
      quickInfosStartInside.appendChild(quickInfosStartInsideContent);

      quickInfosSow.appendChild(quickInfosStartOutside);
      quickInfosStartOutside.appendChild(quickInfosStartOutsideTitle);
      quickInfosStartOutside.appendChild(quickInfosStartOutsideContent);

      quickInfosSow.appendChild(quickInfosEnd);
      quickInfosEnd.appendChild(quickInfosEndTitle);
      quickInfosEnd.appendChild(quickInfosEndContent);
    }
  });
}
