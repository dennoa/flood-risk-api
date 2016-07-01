'use strict';

const respond = require('../../components/respond');
const validationRules = require('./search.validationRules');
const Locality = require('./locality.model');

function validate(req) {
  return new Promise((resolve, reject)=> {
    req.checkBody(validationRules);
    let errors = req.validationErrors();
    if (errors) { return reject(errors); }
    resolve();
  });
}

function findEntity(conditions) {
  return Locality.find({ locality_name: new RegExp(conditions.locality_name, 'i') }).exec();
}

function search(req) {
  return new Promise((resolve, reject)=> {
    validate(req).then(()=> {
      findEntity(req.body).then(resolve, reject);
    }, reject);
  });
};

module.exports = (req, res)=> {
  return respond(res, search(req));
};