const env = process.env.NODE_ENV || 'development';
const _ = require('lodash');

module.exports = _.merge({
  mongo: {
    options: {
      db: {
        safe: true
      },
      config: {
        autoIndex: false
      }
    }
  },
  port: process.env.PORT || 9000,
  cors: {
    supportedHostnames: null
  },
  apiKey: {
    default: {
      key: 'public-access'
    }
  }
}, require('./' + env));