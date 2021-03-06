import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import { useHistory } from "react-router-dom";
import { Flex, Text } from "rebass";

import { Card } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { ENQUETES } from "./queries";

export function DirectionEnquetesList() {
  const history = useHistory();
  const { data, loading, error } = useQuery(ENQUETES);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { enquetes } = data;

  function openEnqueteDetails(enqueteId) {
    history.push(`/direction/enquetes/${enqueteId}`);
  }
  return (
    <>
      {enquetes.map((enquete) => (
        <Card
          key={enquete.id}
          mb={1}
          sx={{ cursor: "pointer" }}
          onClick={() => openEnqueteDetails(enquete.id)}
        >
          <Flex alignItems="center" justifyContent="flex-start">
            <Text fontWeight="bold" color="primary">
              {`Enquête ${enquete.annee} sur l'activité de ${
                enquete.annee - 1
              }`}
            </Text>
            <Text fontWeight="bold" pl={5}>{`Du ${format(
              new Date(enquete.created_at),
              "dd/MM/yyyy"
            )}  au ${format(new Date(enquete.date_fin), "dd/MM/yyyy")}`}</Text>
            <Text fontSize={1} pl={5}>
              {
                "durant cette période le formulaire est visible dans l'espace des mandataires."
              }
            </Text>
          </Flex>
        </Card>
      ))}
    </>
  );
}

export default DirectionEnquetesList;
