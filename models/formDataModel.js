// models/formDataModel.js
const mongoose = require('mongoose');

const dynamicFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  dynamicFields: [dynamicFieldSchema], // Add dynamic fields as an array of objects
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
