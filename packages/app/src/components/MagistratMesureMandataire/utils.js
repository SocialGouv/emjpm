import { formatMandataire } from "../../util/mandataires/MandataireUtils";

export const formatGestionnaire = ({
  discriminator,
  mesures_max,
  mesures_in_progress,
  mandataire,
  gestionnaire_tis,
  mesures_awaiting,
  remaining_capacity,
  service,
  id,
}) => {
  return formatMandataire(
    remaining_capacity,
    discriminator,
    mesures_max,
    mesures_in_progress,
    service,
    mandataire,
    mesures_awaiting,
    gestionnaire_tis,
    id
  );
};
