const { User } = require("~/models");
const { isService, isDirection } = require("@emjpm/biz");

const getUserDirection = (user) => {
  const { direction } = user;
  if (direction === null) {
    return null;
  }
  const data = {
    type: direction.type,
  };
  const { region, departement } = direction;
  if (region) {
    data.region = {
      id: region.id,
      nom: region.nom,
    };
  }
  if (departement) {
    data.departement = {
      code: departement.code,
      nom: departement.nom,
    };
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
    lb_adresse,
    lb_code_postal,
    lb_ville,
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
        "[direction.[departement, region], service.[departement]]"
      );
  } catch (error) {
    return res.status(422).json({
      errors: [{ error: `${error}` }],
    });
  }

  if (!user) {
    return res.status(400).json({
      errors: [{ error: `no user find for this token` }],
    });
  }

  const userData = {
    email: user.email,
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    type: user.type,
  };
  if (isService(user)) {
    userData.service = getUserService(user);
  } else if (isDirection(user)) {
    userData.direction = getUserDirection(user);
  }

  return res.status(200).json(userData);
};

module.exports = { getUser };
