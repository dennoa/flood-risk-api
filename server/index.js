const config = require('./config/environment');
const app = require('express')();
const mongoose = require('mongoose');
const serverEvents = require('./serverEvents');
const logger = require('./components/logger');

mongoose.Promise = Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);

require('./config/express')(app);
require('./api')(app);
require('./eventListeners');

app.listen(config.port, ()=> {
  serverEvents.notifyStartup();
  logger.info('Listening on port %s', config.port);
});