import { formatMandataire } from "../../util/mandataires/MandataireUtils";

export const formatMandatairesList = mandatairesList => {
  return mandatairesList.map(row => {
    const {
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      mandataire,
      gestionnaire_tis,
      mesures_awaiting,
      service
    } = row.gestionnaire;
    return formatMandataire(
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire,
      mesures_awaiting,
      gestionnaire_tis
    );
  });
};
