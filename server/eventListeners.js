'use strict';

/**
 * Register event listeners outside of modules in order to decouple the module functionality from external triggers. 
 */
const serverEvents = require('./serverEvents');
const apiKey = require('./components/apiKey');

serverEvents.onStartup(apiKey.ensureAtLeastOneApiKeyIsAvailable);
