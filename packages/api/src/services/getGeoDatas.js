const {
  GeolocalisationCodePostal,
} = require("~/models/GeolocalisationCodePostal");

module.exports = async (code_postal, ville) => {
  if (!code_postal) {
    return {};
  }
  if (!ville) {
    return {};
  }
  const geoDatas = await GeolocalisationCodePostal.query().where({
    code_postal,
  });
  if (!geoDatas.length) {
    return {};
  }
  let geoData = geoDatas.find((el) => el.cities === ville.toUpperCase().trim());
  if (!geoData) {
    geoData = geoDatas[0];
  }
  return geoData;
};
