import * as areaApi from '../api/areaApi.js';
import * as vegetableManagerApi from '../api/vegetableManagerApi.js';

const productionPage = document.getElementById('production_page');
productionPage.addEventListener('click', async () => {
  const productionContent = document.getElementById('productionContent');
  productionContent.innerHTML = '';
  const vegetablesData = await vegetableManagerApi.getVegetableManager();
  const areasDataRaw = await areaApi.getAreas();
  const areasData = areasDataRaw.sort((a, b) => {
    if (a.sowing_area && b.sowing_area) {
      return a.name.localeCompare(b.name);
    } else if (a.sowing_area && !b.sowing_area) {
      return -1;
    } else if (!a.sowing_area && b.sowing_area) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  areasData.forEach((area) => {
    const areaName = document.createElement('h3');
    areaName.classList.add('production-container__content__subtitle');
    areaName.textContent = area.name;

    const tableProduction = document.createElement('table');
    tableProduction.classList.add('table-production');
    tableProduction.innerHTML = headerTable;

    productionContent.appendChild(areaName);
    productionContent.appendChild(tableProduction);

    const vegetablesInArea = vegetablesData.filter((vegetable) => {
      return vegetable.area.area_id === area.area_id;
    });
    const vegetablesInAreaSortedNyName = vegetablesInArea.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    vegetablesInAreaSortedNyName.forEach((vegetable) => {
      const tableRow = document.createElement('tr');
      let startMonth;
      let startDay;
      let startCell;
      let endMonth;
      let endDay;
      let endCell;
      let harvestCell;
      let year;

      const currentDate = new Date();
      currentDate.setMonth(5);
      currentDate.setDate(16);
      currentDate.setYear(2024);

      if (vegetable.sowing_date && vegetable.sowed) {
        const sowingDate = new Date(vegetable.sowing_date);
        startMonth = sowingDate.getMonth();
        startDay = sowingDate.getDate();
      }
      if (vegetable.planting_date) {
        const plantingDate = new Date(vegetable.planting_date);
        startMonth = plantingDate.getMonth();
        startDay = plantingDate.getDate();
      }
      startCell = getTableCellByDate(startDay, startMonth);

      if (vegetable.harvest_date) {
        const harvestDate = new Date(vegetable.harvest_date);
        const harvestMonth = harvestDate.getMonth();
        const harvestDay = harvestDate.getDate();
        harvestCell = getTableCellByDate(harvestDay, harvestMonth);
      }
      if (vegetable.remove_date) {
        const removeDate = new Date(vegetable.remove_date);
        endMonth = removeDate.getMonth();
        endDay = removeDate.getDate();
        endCell = getTableCellByDate(endDay, endMonth);
      } else {
        endMonth = currentDate.getMonth();
        endDay = currentDate.getDate();
        endCell = getTableCellByDate(endDay, endMonth);
      }

      for (let i = 0; i <= 52; i++) {
        const tableCell = document.createElement('td');
        if (i > 0 && i <= 4) {
        }
        if (i === 0) {
          tableCell.textContent = '';
          tableCell.style.backgroundImage = `url(./styles/assets/vegetable_icons/${vegetable.name.replace(
            /\s/g,
            ''
          )}.png)`;
          tableCell.classList.add('table-production__vegetable-icon');
        }
        if (i === 1) {
          tableCell.textContent = vegetable.name;
          tableCell.className = 'cell-name';
        }
        if (i === 2) {
          tableCell.textContent = vegetable.variety;
          tableCell.className = 'cell-variety';
        }
        if (i === 3) {
          tableCell.textContent = vegetable.quantity;
          tableCell.className = 'cell-quantity';
        }
        if (i === 4) {
          tableCell.textContent = vegetable.harvest_quantity;
          tableCell.className = 'cell-harvested';
        }

        if (i >= startCell && i <= endCell) {
          const timePeriod = document.createElement('div');
          timePeriod.classList = 'highlight-grow highlight';
          if (i === startCell) {
            timePeriod.classList = 'highlight-grow highlight highlight-start';
          }
          if (i === endCell) {
            timePeriod.classList = 'highlight-grow highlight highlight-end';
          }
          if (startCell == endCell) {
            timePeriod.classList =
              'highlight-grow highlight highlight-start-end';
          }
          if (harvestCell !== null) {
            if (i >= harvestCell && i <= endCell) {
              timePeriod.style.backgroundColor = 'orangered';
            }
          }
          tableCell.appendChild(timePeriod);
        }
        tableRow.appendChild(tableCell);
      }
      tableProduction.appendChild(tableRow);
    });
  });
});

const headerTable = `
<tr>
<th colspan="1" class="cell-logo">&nbsp;</th>
<th colspan="1" class="cell-name">Nom</th>
<th colspan="1" class="cell-variety">Variété</th>
<th colspan="1" class="cell-quantity">Quantité</th>
<th colspan="1" class="cell-harvested">Récolte</th>
<th colspan="4">Jan</th>
<th colspan="4">Fev</th>
<th colspan="4">Mar</th>
<th colspan="4">Avr</th>
<th colspan="4">Mai</th>
<th colspan="4">Jui</th>
<th colspan="4">Jul</th>
<th colspan="4">Aut</th>
<th colspan="4">Sep</th>
<th colspan="4">Oct</th>
<th colspan="4">Nov</th>
<th colspan="4">Dec</th>
</tr>
`;

function getTableCellByDate(day, month) {
  if (day <= 8) {
    return 5 + month * 4 + 0;
  } else if (day <= 16) {
    return 5 + month * 4 + 1;
  } else if (day <= 24) {
    return 5 + month * 4 + 2;
  } else {
    return 5 + month * 4 + 3;
  }
}
