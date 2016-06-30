'use strict';

const respond = require('../../components/respond');
const validationRules = require('./search.validationRules');

function validate(req) {
  return new Promise((resolve, reject)=> {
    req.checkBody(validationRules);
    let errors = req.validationErrors();
    if (errors) { return reject(errors); }
    resolve();
  });
}

function findEntity(conditions) {
  return new Promise((resolve, reject)=> {
    resolve([{todo: 'need to get the data!'}]);
  });
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