// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const FormDataModel = require('./models/formDataModel');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
// Parse incoming JSON data
app.use(bodyParser.json());

// Serve static files (CSS and JS) from the 'public' directory
app.use(express.static('public'));

// Replace 'your_database_url' with the actual connection string to your MongoDB database
const databaseUrl = 'mongodb://localhost:27017/projectsmit';

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database!');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const formData = req.body;

  try {
    // Extract dynamic fields from formData and store them in an array of objects
    const dynamicFields = [];
    for (const key in formData) {
      if (key.startsWith('field_')) {
        console.log(key)
        const dynamicField = {
          name: key, // Use the value as the field name
          value: formData[key],
        };
        dynamicFields.push(dynamicField);
      }
    }

    // Create a new instance of the FormDataModel with constant fields and dynamic fields
    const formDataInstance = new FormDataModel({
      name: formData.name,
      contact: formData.contact,
      dynamicFields: dynamicFields,
    });

    // Save the data to the database
    await formDataInstance.save();

    console.log('Submitted data:', formData);
    res.json({ message: 'Data submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
    res.status(500).json({ error: 'An error occurred while saving data.' });
  }
});


// Route to fetch all data from the database
app.get('/data', async (req, res) => {
  try {
    const formData = await FormDataModel.find({});
    res.json(formData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
// Serve the 'display.html' page
app.get('/display', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'display.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
