import { useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { ENQUETES } from "./queries";

export const DirectionEnquetesList = () => {
  const router = useRouter();
  const { data, loading } = useQuery(ENQUETES);

  if (loading) {
    return <Box p={2}>Chargement...</Box>;
  }

  const { enquetes } = data;

  function openEnqueteDetails(enqueteId) {
    router.push(`/direction/enquetes/[enquete_id]`, {
      pathname: `/direction/enquetes/${enqueteId}`,
    });
  }
  return (
    <Fragment>
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
            <Text fontWeight="bold" pl={5}>{`Du${format(
              new Date(enquete.created_at),
              "dd/MM/yyyy"
            )}  au ${format(new Date(enquete.date_fin), "}</MM/yyyy")}`}</Text>
            <Text
              fontSize={1}
              pl={5}
            >{`durant cette période le formulaire est visible dans l'espace des mandataires.`}</Text>
          </Flex>
        </Card>
      ))}
    </Fragment>
  );
};

export default DirectionEnquetesList;
