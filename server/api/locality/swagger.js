module.exports = {
  "paths": {
    "/locality/search": {
      "post": {
        "tags": ["flood-risk"],
        "summary": "Search for something",
        "description": "Search for some locality",
        "parameters": [{
          "name": "conditions",
          "in": "body",
          "schema": {
            "$ref": "#/definitions/locality/conditions"
          }
        }],
        "responses": {
          "200": {
            "description": "Something",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/locality"
              }
            }
          },
          "400": {
            "description": "Validation errors",
            "schema": {
              "$ref": "#/definitions/validation-errors"
            }
          },
          "500": {
            "description": "System error",
            "schema": {
              "$ref": "#/definitions/system-error"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "locality": {
      "type": "object",
      "description": "Locality",
      "properties": {
        "locality_name": {
          "type": "string",
          "description": "The locality name"
        }
      }
    },
    "locality/conditions": {
      "type": "object",
      "description": "Search for something",
      "required":["name"],
      "properties": {
        "locality_name": {
          "type": "string",
          "description": "Match localities by name"
        }
      }
    }
  }
};
