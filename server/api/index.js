const validateApiKey = require('./validateApiKey');

module.exports = (app)=> {
  app.use('/locality', validateApiKey, require('./locality'));
  app.use('/swagger', require('./swagger'));
};