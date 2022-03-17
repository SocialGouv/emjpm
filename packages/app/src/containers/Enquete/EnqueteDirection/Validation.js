import { Box, Button, Text } from "rebass";
import { HeadingTitle } from "~/containers/HeadingTitle";

import { VALIDATE_ENQUETE_REPONSE } from "./mutations";
import { useMutation } from "@apollo/client";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import useUser from "~/hooks/useUser";
import { useHistory } from "react-router";
import useQueryReady from "~/hooks/useQueryReady";

export default function EnqueteDirectionValidation({
  enquete,
  enqueteReponse,
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

  const history = useHistory();

  const validateEnqueteReponse = async () => {
    await validateEnqueteReponseMutation();
    history.push(`/direction/enquetes/${enqueteId}/reponse/${reponseId}`);
  };

  const { status } = enqueteReponse;

  return (
    <Box py={"50px"}>
      <HeadingTitle textAlign="center">Validation</HeadingTitle>
      <Box>
        <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
          {status !== "validated" && (
            <>
              <Text>
                Pour valider la réponse à l'enquête cliquez sur le bouton
                suivant:
              </Text>
              <Button
                onClick={() => validateEnqueteReponse()}
                mx="auto"
                mt={30}
                title="Valider la réponse"
                aria-label="Valider la réponse"
              >
                Valider
              </Button>
            </>
          )}
          {status === "validated" && (
            <Text>Cette réponse à l'enquête {enquete.annee} est validée</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}
