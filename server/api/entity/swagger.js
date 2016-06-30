module.exports = {
  "paths": {
    "/entity/search": {
      "post": {
        "tags": ["flood-risk"],
        "summary": "Search for something",
        "description": "Search for some entity",
        "parameters": [{
          "name": "conditions",
          "in": "body",
          "schema": {
            "$ref": "#/definitions/entity/conditions"
          }
        }],
        "responses": {
          "200": {
            "description": "Something",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/entity/something"
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
    "entity/something": {
      "type": "object",
      "description": "Something",
      "properties": {
        "todo": {
          "type": "string",
          "description": "Don't have the data or schema yet"
        }
      }
    },
    "entity/conditions": {
      "type": "object",
      "description": "Search for something",
      "required":["todo"],
      "properties": {
        "todo": {
          "type": "string",
          "description": "Match all entities with this value. Could allow mongoose style search conditions"
        }
      }
    }
  }
};
