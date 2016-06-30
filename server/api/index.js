const validateApiKey = require('./validateApiKey');

module.exports = (app)=> {
  app.use('/entity', validateApiKey, require('./entity'));
  app.use('/swagger', require('./swagger'));
};