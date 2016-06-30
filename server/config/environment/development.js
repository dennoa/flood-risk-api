module.exports = {
  mongo: {
    uri: 'mongodb://localhost/flood-risk-dev',
    options: {
      config: {
          autoIndex: true
      }
    }
  },
  cors: {
    supportedHostnames: /localhost/
  }
};