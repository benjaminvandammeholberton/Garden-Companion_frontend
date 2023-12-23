// scripts/utils/date-display.js

const currentDate = new Date();

// Format options for the date
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Use Intl.DateTimeFormat to format the date in French
const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(
  currentDate
);

// Capitalize the first letter of the day and month
const formattedDateCapitalized = formattedDate.replace(/^(.)/, (match) =>
  match.toUpperCase()
);

// Capitalize the first letter of the month
const formattedDateFinal = formattedDateCapitalized.replace(
  /(\s)([a-z])/g,
  (match, separator, char) => separator + char.toUpperCase()
);

const dateElement = document.getElementById('date');
if (dateElement) {
  dateElement.textContent = `${formattedDateFinal}`;
}
