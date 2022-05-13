/* eslint-disable jsx-a11y/no-autofocus */
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box, Text, Flex } from "rebass";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";

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
import useUser from "~/hooks/useUser";
import { AccessibleDialog } from "~/components";

function MagistratMandatairesMapPopup() {
  const {
    currentMarker: { id },
    closeMarker,
  } = useContext(MapContext);

  const user = useUser();

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

  const [currentGestionnaire] = data.view_lb_tis;
  const {
    nom,
    mesures_max,
    mesures_in_progress,
    mandataire,
    service,
    user_type,
    remaining_capacity,
  } = currentGestionnaire;

  const ville = user_type === "service" ? service.ville : mandataire.ville;
  const type = TYPES[user_type];
  return (
    <AccessibleDialog dialogLabelText={nom} onEscFunction={() => closeMarker()}>
      <Box p="1">
        <Flex justify="between" align="center">
          <Text sx={titleStyle}>{nom}</Text>
          <button
            title="Fermer la carte"
            aria-label="Fermer la carte"
            onClick={() => closeMarker()}
          >
            <XCircle
              width="25"
              height="25"
              color="primary"
              aria-hidden="true"
              focusable="false"
              role="img"
            />
          </button>
        </Flex>

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
          to={`/${
            user.type === "greffier" ? "greffiers" : "magistrats"
          }/gestionnaires/${id}`}
          title="Réserver une mesure"
          aria-label="Réserver une mesure"
        >
          Réserver une mesure
        </LinkButton>
      </Box>
    </AccessibleDialog>
  );
}

export { MagistratMandatairesMapPopup };
