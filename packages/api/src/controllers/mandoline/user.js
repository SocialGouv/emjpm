const { User } = require("../../models/User");

const getUserDirection = (user) => {
  const { direction, direction_region, direction_departement } = user;
  if (direction === null) {
    return null;
  }
  const data = {
    type: direction.type,
  };
  switch (direction.type) {
    case "regional":
      data.region = {
        nom: direction_region.nom,
      };
      break;
    case "departemental":
      data.departement = {
        code: direction_departement.code,
        nom: direction_departement.nom,
      };
      break;
  }
  return data;
};

const getUserService = (user) => {
  const { service } = user;
  if (service === null) {
    return null;
  }
  const {
    etablissement,
    siret,
    nom,
    prenom,
    email,
    telephone,
    org_adresse,
    org_code_postal,
    org_gestionnaire,
    org_nom,
    org_ville,
    dispo_max,
    latitude,
    longitude,
    lb_adresse,
    lb_code_postal,
    lb_ville,
    mesures_in_progress: mesures_en_attente,
    mesures_awaiting: mesures_en_cours,
    departement,
  } = service;

  const data = {
    departement: {
      code: departement.code,
      nom: departement.nom,
    },
    dispo_max,
    email,
    etablissement,
    latitude,
    lb_adresse,
    lb_code_postal,
    lb_ville,
    longitude,
    mesures_en_attente,
    mesures_en_cours,
    nom,
    org_adresse,
    org_code_postal,
    org_gestionnaire,
    org_nom,
    org_ville,
    prenom,
    siret,
    telephone,
  };
  return data;
};

const getUser = async (req, res) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  let user;
  try {
    user = await User.query()
      .findById(user_id)
      .withGraphFetched(
        "[direction, service.[departement], direction_departement, direction_region]"
      )
      .whereIn("type", ["service", "direction"]);
    req.user = user;
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ errors: [{ msg: "user not found", value: user_id }] });
  }

  const userData = {
    direction: getUserDirection(user),
    email: user.email,
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    service: getUserService(user),
    type: user.type,
  };

  return res.status(200).json(userData);
};

module.exports = { getUser };
