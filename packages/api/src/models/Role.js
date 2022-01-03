const { Model } = require("objection");

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Role;
