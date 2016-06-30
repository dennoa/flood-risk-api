const express = require('express');
const path = require('path');

module.exports = (app)=> {
  app.use(require('cors')(require('./corsOptions')));
  app.use(require('body-parser').json());
  app.use(require('compression')());
  app.use(express.static(path.normalize(__dirname + '/../../swagger-ui')));
};