export const formatMandatairesList = mandatairesList => {
  return mandatairesList.map(row => {
    let currentDiscriminator = {};
    const { discriminator, mesures_max, mesures_in_progress, service, mandataire } = row;
    const common = {
      currentAvailability: mesures_max - mesures_in_progress,
      dispo_max: mesures_max || 0,
      isAvailable: mesures_max < mesures_in_progress,
      cvLink: "test"
    };
    if (service) {
      currentDiscriminator = {
        id: `${discriminator}-${service.id}`,
        email: service.email ? service.email : "",
        nom: service.nom ? service.nom : "",
        prenom: service.prenom ? service.prenom : "",
        telephone_portable: service.telephone ? service.telephone : "",
        ville: service.ville ? service.ville : ""
      };
    } else {
      currentDiscriminator = {
        id: `${discriminator}-${mandataire.id}`,
        email: mandataire.user.email ? mandataire.user.email : "Email",
        nom: mandataire.user.nom,
        prenom: mandataire.user.prenom,
        telephone_portable: mandataire.telephone ? mandataire.user.telephone : "Téléphone",
        ville: mandataire.ville ? mandataire.ville : "Ville",
        isWoman: mandataire.genre === "H" ? false : true
      };
    }
    return {
      ...common,
      ...currentDiscriminator
    };
  });
};
