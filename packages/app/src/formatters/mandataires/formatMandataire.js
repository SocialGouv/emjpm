import { stdFormatter } from "@emjpm/biz";
import { compareDesc, differenceInMonths } from "date-fns";

import capitalize from "~/utils/std/capitalize";
import { TYPES } from "~/constants/types";

function formatLastLogin(date) {
  return stdFormatter.formatDateUI(date);
}

function newestLastLogin(admins) {
  const dates = admins
    .map(({ user: { last_login } }) => last_login)
    .filter(Boolean)
    .map((val) => new Date(val));
  const [newest] = dates.sort(compareDesc);

  return newest;
}

function isCriticalDate(date) {
  return differenceInMonths(new Date(), new Date(date)) >= 1;
}

export default function formatMandataire({
  remaining_capacity,
  discriminator,
  mesures_max,
  mesures_in_progress,
  service,
  mandataire,
  mesures_awaiting,
  gestionnaire_tis,
  id,
  mesures_last_update,
}) {
  let currentDiscriminator = {};
  const common = {
    currentAvailability: remaining_capacity ? remaining_capacity : 0,
    discriminator: discriminator,
    dispoMax: mesures_max ? mesures_max : 0,
    isAvailable: mesures_max < mesures_in_progress,
    mesuresAwaiting: mesures_awaiting,
    mesuresInProgress: mesures_in_progress,
    tis: gestionnaire_tis,
    type: TYPES[discriminator],
    mesuresLastUpdate: mesures_last_update,
  };

  if (discriminator === "SERVICE") {
    const lastLogin =
      service.service_members && service.service_members.length
        ? newestLastLogin(service.service_members)
        : null;

    currentDiscriminator = {
      adresse: service.adresse ? capitalize(service.adresse) : "",
      adresseComplement: service.adresse_complement
        ? service.adresse_complement
        : "",
      codePostal: service.code_postal ? service.code_postal : "",
      ville: service.ville ? capitalize(service.ville) : "",
      useLocationAdresse: service.use_location_adresse,
      locationAdresse: service.location_adresse
        ? capitalize(service.location_adresse)
        : "",
      locationCodePostal: service.location_code_postal
        ? service.location_code_postal
        : "",
      locationVille: service.location_ville ? service.location_ville : "",
      competences: service.competences || "",
      email: service.email ? service.email : "",
      etablissement: service.etablissement ? service.etablissement : "",
      genre: "F",
      id: id,
      lastLogin: lastLogin ? formatLastLogin(lastLogin) : "",
      lastLoginIsCritical: lastLogin && isCriticalDate(lastLogin),
      latitude: service.latitude || null,
      longitude: service.longitude || null,
      nom: service.nom ? service.nom : null,
      prenom: service.prenom ? service.prenom : null,
      serviceId: service.id,
      telephone: service.telephone ? service.telephone : "",
      suspendActivity: service.suspend_activity || false,
      suspendActivityReason: service.suspend_activity_reason || false,
    };
  } else {
    currentDiscriminator = {
      adresse: mandataire.adresse ? capitalize(mandataire.adresse) : "",
      adresseComplement: mandataire.adresse_complement
        ? mandataire.adresse_complement
        : "",
      useLocationAdresse: mandataire.use_location_adresse,
      locationAdresse: mandataire.location_adresse
        ? capitalize(mandataire.location_adresse)
        : "",
      locationCodePostal: mandataire.location_code_postal
        ? mandataire.location_code_postal
        : "",
      locationVille: mandataire.location_ville ? mandataire.location_ville : "",
      competences: mandataire.competences || "",
      email:
        mandataire.user && mandataire.user.email ? mandataire.user.email : "",
      genre: mandataire.genre ? mandataire.genre : "F",
      id: id,
      lastLogin:
        mandataire.user && mandataire.user.last_login
          ? formatLastLogin(mandataire.user.last_login)
          : "",
      lastLoginIsCritical:
        mandataire.user &&
        mandataire.user.last_login &&
        isCriticalDate(mandataire.user.last_login),
      latitude: mandataire.latitude || null,
      longitude: mandataire.longitude || null,
      mandataireId: mandataire.id,
      nom:
        mandataire.user && mandataire.user.nom
          ? capitalize(mandataire.user.nom)
          : "",
      prenom:
        mandataire.user && mandataire.user.prenom
          ? capitalize(mandataire.user.prenom)
          : "",
      telephone: mandataire.telephone,
      suspendActivity: mandataire.suspend_activity || false,
      suspendActivityReason: mandataire.suspend_activity_reason || false,
    };
  }
  return {
    ...common,
    ...currentDiscriminator,
    mandataire,
    service,
  };
}
