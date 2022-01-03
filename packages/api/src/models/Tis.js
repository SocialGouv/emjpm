const { Model } = require("objection");

class Tis extends Model {
  static get tableName() {
    return "tis";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Tis;
