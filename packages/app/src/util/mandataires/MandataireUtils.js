const TYPES = {
  MANDATAIRE_IND: "individuel",
  MANDATAIRE_PRE: "préposé",
  SERVICE: "service"
};

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const formatMandataire = (
  remaining_capacity,
  discriminator,
  mesures_max,
  mesures_in_progress,
  service,
  mandataire,
  mesures_awaiting,
  gestionnaire_tis
) => {
  let currentDiscriminator = {};
  const common = {
    currentAvailability: remaining_capacity ? remaining_capacity : 0,
    cvLink: "test",
    dispoMax: mesures_max ? mesures_max : 0,
    isAvailable: mesures_max < mesures_in_progress,
    mesuresAwaiting: mesures_awaiting,
    mesuresInProgress: mesures_in_progress,
    tis: gestionnaire_tis,
    type: TYPES[discriminator]
  };

  if (discriminator === "SERVICE") {
    const [headquarter] = service.service_antennes ? service.service_antennes : [];
    currentDiscriminator = {
      adresse: service.adresse ? capitalize(service.adresse) : "non renseigné",
      antenneId: service.service_antennes ? headquarter.id : null,
      codePostal: service.code_postal ? capitalize(service.code_postal) : "non renseigné",
      email: service.email ? service.email : "non renseigné",
      etablissement: service.etablissement ? service.etablissement : "non renseigné",
      genre: "F",
      id: `${discriminator}-${service.id}`,
      nom: service.nom ? service.nom : null,
      prenom: service.prenom ? service.prenom : null,
      telephone: service.telephone ? service.telephone : "non renseigné",
      ville: service.ville ? capitalize(service.ville) : "non renseigné"
    };
  } else {
    currentDiscriminator = {
      adresse: mandataire.adresse ? capitalize(mandataire.adresse) : "non renseigné",
      codePostal: mandataire.code_postal ? capitalize(mandataire.code_postal) : "non renseigné",
      email: mandataire.user && mandataire.user.email ? mandataire.user.email : "non renseigné",
      genre: mandataire.genre ? mandataire.genre : "F",
      id: `${discriminator}-${mandataire.id}`,
      mandataireId: mandataire.id,
      nom:
        mandataire.user && mandataire.user.nom ? capitalize(mandataire.user.nom) : "non renseigné",
      prenom:
        mandataire.user && mandataire.user.prenom
          ? capitalize(mandataire.user.prenom)
          : "non renseigné",
      telephone: mandataire.telephone,
      ville: mandataire.ville ? capitalize(mandataire.ville) : "non renseigné"
    };
  }
  return {
    ...common,
    ...currentDiscriminator
  };
};
