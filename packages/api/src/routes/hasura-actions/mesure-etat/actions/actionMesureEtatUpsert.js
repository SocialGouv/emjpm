const { MesureEtat } = require("../../../../models/MesureEtat");

module.exports = async (req, res) => {
  const {
    // id,
    mesure_id,
    champ_mesure,
    date_changement_etat,
    lieu_vie,
    nature_mesure,
    pays,
    type_etablissement,
    code_postal,
    ville,
  } = req.body;

  const etat = MesureEtat.query().insertAndFetch({
    champ_mesure,
    code_postal,
    date_changement_etat,
    lieu_vie,
    mesure_id,
    nature_mesure,
    pays,
    type_etablissement,
    ville,
  });

  return res.json(...etat);

  // if (values.pays === "FR") {
  //   const location = await getLocation(client, {
  //     city: values.ville,
  //     zipcode: values.code_postal,
  //   });

  //   if (!location || !location.department) {
  //     setErrors({
  //       zipcode: `Le code postal semble invalide.`,
  //     });
  //     return setSubmitting(false);
  //   } else {
  //     const { department, geolocation } = location;

  //     variables.latitude = geolocation ? geolocation.latitude : null;
  //     variables.longitude = geolocation ? geolocation.longitude : null;
  //     variables.department_id = department.id;
  //   }
  // }
};
