import { Box, Button, Text } from "rebass";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { VALIDATE_ENQUETE_REPONSE } from "./mutations";
import { useMutation } from "@apollo/client";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import useQueryReady from "~/hooks/useQueryReady";
import useUser from "~/hooks/useUser";

const typeLabels = {
  individuel: "Mandataire individuel",
  prepose: "Mandataire préposé d'établissement",
  service: "Service",
};

const statusLabels = {
  draft: "En cours",
  submitted: "Réponse reçue",
  validated: "Réponse validée",
};

export default function EnqueteDirectionStatut({
  enquete,
  enqueteReponse,
  goToFirstPage,
}) {
  const { id: enqueteId } = enquete;
  const { id: reponseId } = enqueteReponse;
  const { id: userId } = useUser();
  const [validateEnqueteReponseMutation, { loading, error }] = useMutation(
    VALIDATE_ENQUETE_REPONSE,
    {
      variables: {
        reponseId,
      },
      refetchQueries: [
        "ENQUETE_DETAILS_LIST",
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId },
        },
      ],
    }
  );

  useQueryReady(loading, error);

  const validateEnqueteReponse = async () => {
    await validateEnqueteReponseMutation();
  };

  return (
    <Box py={"50px"}>
      <HeadingTitle textAlign="center">
        Statut de la réponse N°{enqueteReponse.id} à l'enquête {enquete.annee}
      </HeadingTitle>
      <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
        <Text>
          Enquête de {enquete.annee} concernant l'année {enquete.annee - 1}
        </Text>
        <Text>Statut: {statusLabels[enqueteReponse.status]}</Text>
        <Text>Type de mandataire: {typeLabels[enqueteReponse.user_type]}</Text>
      </Box>
      <Box>
        <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
          {enqueteReponse.status === "submitted" && (
            <Text>
              Vous pouvez visualiser, modifier ou valider les réponses.
            </Text>
          )}
          {enqueteReponse.status === "validated" && (
            <Text>Vous pouvez visualiser ou modifier réponses.</Text>
          )}
          <Box>
            <Button onClick={() => goToFirstPage()} mx="auto" mt={30}>
              Accéder aux réponses
            </Button>
          </Box>
          {enqueteReponse.status === "submitted" && (
            <Box>
              <Button
                onClick={() => validateEnqueteReponse()}
                mx="auto"
                mt={30}
              >
                Valider
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
