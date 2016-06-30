const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  key: { type: String, index: true, unique: true },
  dateFrom: { type: Date, default: Date.now },
  dateTo: Date
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);