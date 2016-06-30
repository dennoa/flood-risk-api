'use strict';

const ApiKey = require('./apiKey.model');
const logger = require('../logger');
const config = require('../../config/environment');

function findValid(key) {
  let now = new Date();
  var conditions = { 
    key: key, 
    dateFrom: { $lte: now }, 
    $or: [{
      dateTo: { $gte: now }
    },{
      dateTo: { $exists: false }
    }]
  };
  return ApiKey.findOne(conditions).exec();
}

function validate(req) {
  return new Promise((resolve, reject)=> {
    let key = req.get('x-iag-api-key');
    if (!key) { return reject(); }
    findValid(key).then((doc)=> {
      return (doc) ? resolve() : reject();
    }, reject);
  });
}

function create(doc) {
  return ApiKey.create(doc).exec();
}

function logKeyCreationError(err) {
  logger.error('Failed to create an api key', err);
}

function ensureAtLeastOneApiKeyIsAvailable() {
  return ApiKey.findOne({}).exec().then((doc)=> {
    if (!doc) { create(config.apiKey.default).catch(logKeyCreationError); }
  }, logKeyCreationError);
}

module.exports = {
  validate: validate,
  create: create,
  ensureAtLeastOneApiKeyIsAvailable: ensureAtLeastOneApiKeyIsAvailable
};