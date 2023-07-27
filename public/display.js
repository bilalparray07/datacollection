// public/display.js
document.addEventListener('DOMContentLoaded', () => {
  const displayContainer = document.getElementById('displayData');

  async function fetchDataAndDisplay() {
    try {
      const response = await fetch('/data');
      const formData = await response.json();

      displayContainer.innerHTML = '';

      formData.forEach((data) => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Contact Number:</strong> ${data.contact}</p>
          ${data.dynamicFields.map(
            (dynamicField) =>
              `<p><strong>${dynamicField.name}:</strong> ${dynamicField.value}</p>`
          ).join('')}
          <hr>
        `;
        displayContainer.appendChild(entryDiv);
      });
    } catch (error) {
      console.error('Error fetching and displaying data:', error);
      alert('An error occurred while fetching and displaying data.');
    }
  }

  // Fetch and display the data on page load
  fetchDataAndDisplay();
});
