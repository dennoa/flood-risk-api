const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
  LOCALITY_ID: { type: String, index: true, unique: true },
  LOCALITY_NAME: String,
  PRIMARY_POSTCODE: String
});

module.exports = mongoose.model('Locality', LocalitySchema);