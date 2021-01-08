import { isIndividuel, isPrepose } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Card, Flex } from "rebass";

import { Link } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import { Heading4, Text } from "~/ui";

const MandataireBoard = () => {
  const { type, mandataire } = useContext(UserContext);
  const {
    mesures_en_cours = 0,
    mesures_en_attente = 0,
    dispo_max = 0,
    mandataire_tis: mandataireTis,
    lb_user: lbUser,
  } = mandataire;

  const isTribunal = mandataireTis?.length > 0;

  return (
    <Box>
      <Flex p={1} flexDirection="column" width="300px">
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading4>Vos indicateurs</Heading4>
          </Box>
        </Box>
        <Card>
          <Box>
            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{dispo_max}</Text>
              <Link to="/mandataires/edit-informations">
                <Text ml={1}>{"mesures souhaitées"}</Text>
              </Link>
            </Flex>
            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{mesures_en_cours}</Text>
              <Link to="/mandataires/mesures">
                <Text ml={1}>{"mesures en cours"}</Text>
              </Link>
            </Flex>

            <Flex px={1} mb={1}>
              <Text fontWeight="bold">{mesures_en_attente}</Text>
              <Link to="/mandataires/mesures">
                <Text ml={1}>{"mesures en attente"}</Text>
              </Link>
            </Flex>
          </Box>
        </Card>
      </Flex>

      <Flex p={1} flexDirection="column" width="300px">
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading4>Vos tribunaux</Heading4>
          </Box>
        </Box>
        <Card>
          {mandataireTis.map(({ ti }) => {
            return (
              <Text px={1} mb={1} key={ti.id}>
                {ti.etablissement}
              </Text>
            );
          })}
          {!isTribunal && (
            <Text px={1} mb={1}>
              {"Vous n'êtes pas visible par les juges des tutelles"}
            </Text>
          )}
          <Flex justifyContent="flex-end">
            <Link to="/mandataires/edit-informations">
              {isTribunal ? "Modifier" : "Ajouter des tribunaux"}
            </Link>
          </Flex>
        </Card>
      </Flex>

      {isIndividuel({ type }) && (
        <Flex p={1} flexDirection="column" width="300px">
          <Box bg="cardSecondary">
            <Box p={1}>
              <Heading4>Vos agréments</Heading4>
            </Box>
          </Box>
          <Card>
            {lbUser?.lb_departements?.map(
              ({ departement, departement_financeur }) => {
                return (
                  <Flex px={1} mb={1} key={departement.id} alignItems="center">
                    <Text>{departement.nom} </Text>
                    {departement_financeur && (
                      <Text ml={1} fontSize="12px" fontWeight="bold">
                        {"département financeur"}
                      </Text>
                    )}
                  </Flex>
                );
              }
            )}
          </Card>
        </Flex>
      )}

      {isPrepose({ type }) && (
        <Flex p={1} flexDirection="column" width="300px">
          <Box bg="cardSecondary">
            <Box p={1}>
              <Heading4>Vos établissements</Heading4>
            </Box>
          </Box>
          <Card>
            {lbUser?.lb_user_etablissements?.map(
              ({ etablissement, etablissement_rattachement }) => {
                return (
                  <Flex
                    px={1}
                    mb={1}
                    key={etablissement.id}
                    alignItems="center"
                  >
                    <Text fontSize="10px">{etablissement.rslongue} </Text>
                    {etablissement_rattachement && (
                      <Text ml={1} fontSize="8px" fontWeight="bold">
                        {"établissement de rattachement"}
                      </Text>
                    )}
                  </Flex>
                );
              }
            )}
          </Card>
        </Flex>
      )}
    </Box>
  );
};

export { MandataireBoard };
