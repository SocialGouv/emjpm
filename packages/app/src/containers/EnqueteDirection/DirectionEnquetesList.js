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

  return (
    <>
      {enquetes.map((enquete) => (
        <Card
          key={enquete.id}
          mb={1}
          as="a"
          href={`/direction/enquetes/${enquete.id}`}
          sx={{ display: "block" }}
          title={`Enquête ${enquete.annee} sur l'activité de ${
            enquete.annee - 1
          }`}
          aria-label={`Enquête ${enquete.annee} sur l'activité de ${
            enquete.annee - 1
          }`}
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
