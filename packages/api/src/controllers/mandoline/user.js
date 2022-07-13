const { User, Departement } = require("~/models");
const { isService, isDirection, isSdpf } = require("@emjpm/biz");

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
      code: departement.id,
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
    id,
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
    adresse,
    code_postal,
    ville,
    mesures_in_progress: mesures_en_cours,
    mesures_awaiting: mesures_en_attente,
    departements,
  } = service;

  const data = {
    adresse,
    code_postal,
    departement: departements[0]
      ? {
          code: departements[0].id,
          nom: departements[0].nom,
        }
      : null,
    departements: departements.map((departement) => ({
      code: departement.id,
      nom: departement.nom,
    })),
    dispo_max,
    email,
    etablissement,
    id,
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
    ville,
  };
  return data;
};

const getUserSdpf = async (user) => {
  const { sdpf } = user;
  const departments = await Departement.query();

  if (sdpf === null) {
    return null;
  }
  const {
    id,
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
    adresse,
    code_postal,
    ville,
    departement,
    dispo_max,
  } = sdpf;

  const foundedDep = departments.find((dep) => dep.id === departement);

  const dep = {
    code: foundedDep.id,
    nom: foundedDep.nom,
  };

  const data = {
    adresse,
    code_postal,
    departement: dep,
    dispo_max,
    email,
    etablissement,
    id,
    nom,
    org_adresse,
    org_code_postal,
    org_gestionnaire,
    org_nom,
    org_ville,
    prenom,
    siret,
    telephone,
    ville,
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
        "[direction.[departement, region], service(selectAll, selectMesuresAwaiting, selectMesuresInProgress).[departements], sdpf(selectAll)]"
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
  if (isSdpf(user)) {
    const dpfProfils = await getUserSdpf(user);
    userData.dpf = dpfProfils;
  }
  if (isService(user)) {
    userData.service = getUserService(user);
  } else if (isDirection(user)) {
    userData.direction = getUserDirection(user);
  }

  return res.status(200).json(userData);
};

module.exports = { getUser };
