const { Model } = require("objection");

class Etablissements extends Model {
  static get tableName() {
    return "etablissements";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Etablissements;
