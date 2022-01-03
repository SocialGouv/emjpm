const { Model } = require("objection");

class GeolocalisationCodePostal extends Model {
  static get tableName() {
    return "geolocalisation_code_postal";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = GeolocalisationCodePostal;
