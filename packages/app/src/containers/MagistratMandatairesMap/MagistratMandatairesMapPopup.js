import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box, Text } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { MapContext } from "~/containers/Map/context";
import { TYPES } from "~/constants/mandataire";

import { MESURES_GESTIONNAIRE } from "./queries";
import {
  descriptionStyle,
  dispoDescriptionStyle,
  labelStyle,
  subtitleStyle,
  titleStyle,
} from "./style";

function MagistratMandatairesMapPopup() {
  const {
    currentMarker: { id },
  } = useContext(MapContext);
  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRE, {
    fetchPolicy: "network-only",
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [currentGestionnaire] = data.view_mesure_gestionnaire;
  const {
    nom,
    mesures_max,
    mesures_in_progress,
    mandataire,
    service,
    discriminator,
    remaining_capacity,
  } = currentGestionnaire;

  const ville = discriminator === "SERVICE" ? service.ville : mandataire.ville;
  const type = TYPES[discriminator];
  return (
    <Box p="1">
      <Text sx={titleStyle}>{nom}</Text>
      <Text sx={subtitleStyle}>{type}</Text>
      <Text sx={labelStyle}>En cours / souhaitées</Text>
      <Text sx={dispoDescriptionStyle(remaining_capacity > 0)}>
        {mesures_in_progress}/{mesures_max}
      </Text>
      <Text sx={labelStyle}>Ville</Text>
      <Text sx={descriptionStyle}>{ville}</Text>
      <LinkButton
        mt="2"
        width="100%"
        textAlign="center"
        to={`/magistrats/gestionnaires/${id}`}
      >
        Réserver une mesure
      </LinkButton>
    </Box>
  );
}

export { MagistratMandatairesMapPopup };
