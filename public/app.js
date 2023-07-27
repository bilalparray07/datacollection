// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dynamicFieldsContainer = document.getElementById('dynamicFields');
    const addFieldButton = document.getElementById('addField');
    const nameInput = document.getElementById('name')
    const contactInput = document.getElementById('contact')
   
    
    let fieldIndex = 0;
  
    // Function to add a new dynamic field
    function addDynamicField() {
      const fieldName = prompt('Enter field name:');
      if (fieldName === null || fieldName.trim() === '') {
        return; // Don't add a field if the user cancels or provides an empty name
      }
  
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.name = `field_${fieldName}`;
      inputField.classList.add('form-control','mt-3','dynamicInput')
      inputField.placeholder = fieldName; // Use the user-provided name as the placeholder
      dynamicFieldsContainer.appendChild(inputField);
      fieldIndex++;
    }
  
    // Add initial dynamic field
    addFieldButton.addEventListener('click', addDynamicField);
  
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form. Please try again.');
        });

        nameInput.value= "";
        contactInput.value="";
       
    });
  });
  