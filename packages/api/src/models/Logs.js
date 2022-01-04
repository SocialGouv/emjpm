const { Model } = require("objection");

class Logs extends Model {
  static get tableName() {
    return "logs_data";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Logs;
