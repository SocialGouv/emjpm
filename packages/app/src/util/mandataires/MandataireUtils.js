const TYPES = {
  SERVICE: "service",
  MANDATAIRE_PRE: "préposé",
  MANDATAIRE_IND: "individuel"
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
  gestionnaire_tis
) => {
  let currentDiscriminator = {};
  const common = {
    tis: gestionnaire_tis,
    currentAvailability: remaining_capacity ? remaining_capacity : 0,
    dispoMax: mesures_max ? mesures_max : 0,
    mesuresInProgress: mesures_in_progress,
    isAvailable: mesures_max < mesures_in_progress,
    cvLink: "test",
    type: TYPES[discriminator]
  };

  if (discriminator === "SERVICE") {
    const [headquarter] = service.service_antennes ? service.service_antennes : [];
    currentDiscriminator = {
      antenneId: service.service_antennes ? headquarter.id : null,
      id: `${discriminator}-${service.id}`,
      email: service.email ? service.email : "non renseigné",
      nom: service.nom ? capitalize(service.nom) : "non renseigné",
      prenom: service.prenom ? capitalize(service.prenom) : "non renseigné",
      telephone: service.telephone ? service.telephone : "non renseigné",
      adresse: service.adresse ? capitalize(service.adresse) : "non renseigné",
      codePostal: service.code_postal ? capitalize(service.code_postal) : "non renseigné",
      ville: service.ville ? capitalize(service.ville) : "non renseigné",
      genre: "F"
    };
  } else {
    currentDiscriminator = {
      mandataireId: mandataire.id,
      id: `${discriminator}-${mandataire.id}`,
      email: mandataire.user && mandataire.user.email ? mandataire.user.email : "non renseigné",
      nom:
        mandataire.user && mandataire.user.nom ? capitalize(mandataire.user.nom) : "non renseigné",
      prenom:
        mandataire.user && mandataire.user.prenom
          ? capitalize(mandataire.user.prenom)
          : "non renseigné",
      telephone: mandataire.telephone,
      adresse: mandataire.adresse ? capitalize(mandataire.adresse) : "non renseigné",
      codePostal: mandataire.code_postal ? capitalize(mandataire.code_postal) : "non renseigné",
      ville: mandataire.ville ? capitalize(mandataire.ville) : "non renseigné",
      genre: mandataire.genre ? mandataire.genre : "F"
    };
  }
  return {
    ...common,
    ...currentDiscriminator
  };
};
