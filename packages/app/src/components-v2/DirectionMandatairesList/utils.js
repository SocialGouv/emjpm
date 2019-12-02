import { formatMandataire } from "../../util/mandataires/MandataireUtils";

export const formatMandatairesList = mandatairesList => {
  return mandatairesList.map(row => {
    const {
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire
    } = row;
    return formatMandataire(
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire
    );
  });
};
