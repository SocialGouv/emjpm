exports.up = async function(knex) {
  const services = await knex("services");
  const mandataires = await knex("mandataires");
  const mesures = await knex("mesures");
  Promise.all(
    services.map(async service => {
      const [zip_coordinates] = await knex("geolocalisation_code_postal").where(
        "code_postal",
        service.code_postal
      );
      const [insee_coordinates] = await knex(
        "geolocalisation_code_postal"
      ).where("insee", service.code_postal);
      if (zip_coordinates) {
        return await knex("services")
          .where("id", service.id)
          .update("latitude", zip_coordinates.latitude)
          .update("longitude", zip_coordinates.longitude);
      } else if (insee_coordinates) {
        return await knex("services")
          .where("id", service.id)
          .update("latitude", insee_coordinates.latitude)
          .update("longitude", insee_coordinates.longitude);
      } else {
        return null;
      }
    })
  );
  Promise.all(
    mandataires.map(async mandataire => {
      const [zip_coordinates] = await knex("geolocalisation_code_postal").where(
        "code_postal",
        mandataire.code_postal
      );
      const [insee_coordinates] = await knex(
        "geolocalisation_code_postal"
      ).where("insee", mandataire.code_postal);
      if (zip_coordinates) {
        return await knex("mandataires")
          .where("id", mandataire.id)
          .update("latitude", zip_coordinates.latitude)
          .update("longitude", zip_coordinates.longitude);
      } else if (insee_coordinates) {
        return await knex("mandataires")
          .where("id", mandataire.id)
          .update("latitude", insee_coordinates.latitude)
          .update("longitude", insee_coordinates.longitude);
      } else {
        return null;
      }
    })
  );
  return Promise.all(
    mesures.map(async mesure => {
      const [zip_coordinates] = await knex("geolocalisation_code_postal").where(
        "code_postal",
        mesure.code_postal
      );
      if (zip_coordinates) {
        return await knex("mesures")
          .where("id", mesure.id)
          .update("latitude", zip_coordinates.latitude)
          .update("longitude", zip_coordinates.longitude);
      } else {
        return null;
      }
    })
  );
};

exports.down = function() {};
