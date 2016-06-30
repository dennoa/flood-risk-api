const _ = require('lodash');
const swagger = _.merge({}, 
  require('./swagger'), 
  require('../entity/swagger')
);

module.exports = (app)=> {
  app.get('/swagger', (req, res)=> {
    res.status(200).send(swagger);
  });
};
