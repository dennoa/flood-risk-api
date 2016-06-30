/* See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md for details of the swaggerMiddleware object schema.
 * The intent here is that we can split the swaggerMiddleware configuration into the various functional areas and just include them here in the main file.
 */
const _ = require('lodash');
const swagger = _.merge({
  "swagger": "2.0",
  "info": {
    "title": "Flood Risk API for GovHack",
    "description": "Query flood risk data",
    "version": "1.0"
  },
  "basePath": "/",
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "tags": [
    { "name": "flood-risk", "description": "Flood Risk" }
  ],
  "securityDefinitions": {
    "apiKey": {
      "type": "apiKey",
      "description": "Your API key provided on registration",
      "name": "x-iag-api-key",
      "in": "header"
    }
  },
  "security": [
    ["apiKey"]
  ],
  "paths": {
  },
  "definitions": {
    "validation-error": {
      "type": "object",
      "description": "Validation error",
      "properties": {
        "param": {
          "type": "string",
          "description": "The parameter in error"
        },
        "msg": {
          "type": "string",
          "enum": ["required"],
          "description": "The error code"
        }
      }
    },
    "validation-errors": {
      "type": "array",
      "description": "Validation errors",
      "items": {
        "$ref": "#/definitions/validation-error"
      }
    },
    "system-error": {
      "type": "object",
      "description": "System error",
      "properties": {
        "error": {
          "type": "string",
          "description": "The error message"
        }
      }
    }
  }
}, require('./entity/swagger'));

module.exports = (req, res) => {
  res.status(200).send(swagger);
};