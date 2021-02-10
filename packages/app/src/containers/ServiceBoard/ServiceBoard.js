import { useContext } from "react";
import { Box, Card, Flex } from "rebass";

import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Heading, Text } from "~/components";

function ServiceBoard() {
  const { service } = useUser();
  const {
    mesures_in_progress = 0,
    mesures_awaiting = 0,
    dispo_max = 0,
    service_tis: serviceTis,
  } = service;

  const isTribunal = serviceTis?.length > 0;

  return (
    <Box>
      <Flex p={1} flexDirection="column" width="300px">
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading size={4}>Vos indicateurs</Heading>
          </Box>
        </Box>
        <Card>
          <Box>
            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{dispo_max}</Text>
              <Link to="/services/edit-informations">
                <Text ml={1}>{"mesures souhaitées"}</Text>
              </Link>
            </Flex>
            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{mesures_in_progress}</Text>
              <Link to="/services/mesures">
                <Text ml={1}>{"mesures en cours"}</Text>
              </Link>
            </Flex>

            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{mesures_awaiting}</Text>
              <Link to="/services/mesures">
                <Text ml={1}>{"mesures en attente"}</Text>
              </Link>
            </Flex>
          </Box>
        </Card>
      </Flex>

      <Flex p={1} flexDirection="column" width="300px">
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading size={4}>Vos tribunaux</Heading>
          </Box>
        </Box>
        <Card>
          {serviceTis.map(({ ti }) => {
            return (
              (ti && (
                <Text px={1} mb={1} key={ti.id}>
                  {ti.etablissement}
                </Text>
              )) ||
              null
            );
          })}
          {!isTribunal && (
            <Text px={1} mb={1}>
              {"Vous n'êtes pas visible par les juges des tutelles"}
            </Text>
          )}
          <Flex justifyContent="flex-end">
            <Link to="/services/edit-informations">
              {isTribunal ? "Modifier" : "Ajouter des tribunaux"}
            </Link>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
}

export { ServiceBoard };
