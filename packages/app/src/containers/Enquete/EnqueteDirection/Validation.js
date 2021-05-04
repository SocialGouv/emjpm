import { Box, Button, Text } from "rebass";
import { HeadingTitle } from "~/containers/HeadingTitle";

import { VALIDATE_ENQUETE_REPONSE } from "./mutations";
import { useMutation } from "@apollo/client";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import useUser from "~/hooks/useUser";
import { useHistory } from "react-router";

export default function EnqueteDirectionValidation({
  enquete,
  enqueteReponse,
}) {
  const { id: enqueteId } = enquete;
  const { id: reponseId } = enqueteReponse;
  const { id: userId } = useUser();

  const [validateEnqueteReponseMutation] = useMutation(
    VALIDATE_ENQUETE_REPONSE,
    {
      variables: {
        reponseId,
      },
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId },
        },
      ],
    }
  );

  const history = useHistory();

  const validateEnqueteReponse = async () => {
    await validateEnqueteReponseMutation();
    history.push(`/direction/enquetes/${enqueteId}/reponse/${reponseId}`);
  };

  return (
    <Box py={"50px"}>
      <HeadingTitle textAlign="center">Validation</HeadingTitle>
      <Box>
        <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
          <Text>
            Pour valider la réponse à l'enquête cliquez sur le bouton suivant:
          </Text>
          <Button onClick={() => validateEnqueteReponse()} mx="auto" mt={30}>
            Valider
          </Button>
        </Box>
      </Box>
    </Box>
  );
}