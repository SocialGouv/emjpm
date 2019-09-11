const TYPES = {
  SERVICE: "service",
  MANDATAIRE_PRE: "préposé",
  MANDATAIRE_IND: "individuel"
};

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const formatMandatairesList = mandatairesList => {
  return mandatairesList.map(row => {
    let currentDiscriminator = {};
    const {
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire
    } = row;

    const common = {
      currentAvailability: remaining_capacity ? remaining_capacity : 0,
      dispoMax: mesures_max ? mesures_max : 0,
      isAvailable: mesures_max < mesures_in_progress,
      cvLink: "test",
      type: TYPES[discriminator]
    };

    if (discriminator === "SERVICE") {
      currentDiscriminator = {
        id: `${discriminator}-${service.id}`,
        email: service.email ? service.email : "non renseigné",
        nom: service.nom ? capitalize(service.nom) : "non renseigné",
        prenom: service.prenom ? capitalize(service.prenom) : "non renseigné",
        telephone: service.telephone ? service.telephone : "non renseigné",
        ville: service.ville ? capitalize(service.ville) : "non renseigné",
        genre: "F"
      };
    } else {
      currentDiscriminator = {
        id: `${discriminator}-${mandataire.id}`,
        email: mandataire.user.email ? mandataire.user.email : "non renseigné",
        nom: mandataire.user.nom ? capitalize(mandataire.user.nom) : "non renseigné",
        prenom: mandataire.user.prenom ? capitalize(mandataire.user.prenom) : "non renseigné",
        telephone: mandataire.telephone,
        ville: mandataire.ville ? capitalize(mandataire.ville) : "non renseigné",
        genre: mandataire.genre ? mandataire.genre : "F"
      };
    }
    return {
      ...common,
      ...currentDiscriminator
    };
  });
};
