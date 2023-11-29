document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.icons_container');
  const forms = document.querySelectorAll('.form');

  // Function to toggle form visibility
  function toggleFormVisibility(formIndex) {
    // Hide the icons
    icons.forEach((icons_container) => {
      icons_container.style.display = 'none';
      icons_container.style.justifyContent = 'initial';
      icons_container.style.alignItems = 'initial';
    });

    // Add a class to the icons_container to adjust its size and font size
    const currentIconsContainer = icons[formIndex];
    currentIconsContainer.style.display = 'flex';
    currentIconsContainer.style.justifyContent = 'center';
    currentIconsContainer.style.alignItems = 'center';
    currentIconsContainer.classList.add('large_icons_container');

    // Show the corresponding form and return button
    forms[formIndex].style.display = 'block';
    const returnButton = forms[formIndex].querySelector('.return-button');
    returnButton.style.display = 'block';

    // Add a click event listener to the return button
    returnButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Hide the form and return button
      forms[formIndex].style.display = 'none';
      returnButton.style.display = 'none';
      // Show the icons and reset their styling
      icons.forEach((icons_container) => {
        icons_container.style.display = 'flex';
        icons_container.style.justifyContent = 'initial';
        icons_container.style.alignItems = 'initial';
        icons_container.classList.remove('large_icons_container');
      });
    });
  }

  // Add click event listeners to all icons
  icons.forEach((icons_container, index) => {
    icons_container.addEventListener('click', () => {
      toggleFormVisibility(index);
      // hideSowingTable();
    });
  });
});
