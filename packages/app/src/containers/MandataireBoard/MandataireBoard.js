import { isIndividuel, isPrepose } from "@emjpm/biz";
import { Box, Card, Flex } from "rebass";
import styled from "@emotion/styled";

import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Heading, Text } from "~/components";

function MandataireBoard() {
  const { type, mandataire } = useUser();
  const {
    mesures_en_cours = 0,
    mesures_en_attente = 0,
    dispo_max = 0,
    mandataire_tis: mandataireTis,
    liste_blanche: listeBlanche,
  } = mandataire;

  const isTribunal = mandataireTis?.length > 0;

  const MesureNumber = styled.span`
    font-weight: bold;
    font-weight: 700;
    color: #404040;
  `;

  return (
    <Box>
      <Flex
        p={1}
        flexDirection="column"
        width="300px"
        id="vos_indicateurs"
        tabIndex="0"
      >
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading size={4}>Vos indicateurs</Heading>
          </Box>
        </Box>
        <Card>
          <Box>
            <Flex px={1} mb={1}>
              <Link to="/mandataires/edit-informations">
                <MesureNumber>{dispo_max} </MesureNumber> mesures souhaitées
              </Link>
            </Flex>
            <Flex px={1} mb={1}>
              <Link to="/mandataires/mesures">
                <MesureNumber>{mesures_en_cours}</MesureNumber>{" "}
                {"mesures en cours"}
              </Link>
            </Flex>

            <Flex px={1} mb={1}>
              <Link to="/mandataires/mesures">
                <MesureNumber>{mesures_en_attente}</MesureNumber>{" "}
                {"mesures en attente"}
              </Link>
            </Flex>
          </Box>
        </Card>
      </Flex>
      <Flex p={1} flexDirection="column" width="300px" tabIndex="0">
        <Box bg="cardSecondary">
          <Box p={1}>
            <Heading size={4}>Vos tribunaux</Heading>
          </Box>
        </Box>
        <Card>
          {mandataireTis &&
            mandataireTis.map(({ ti }) => {
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
            <Link to="/mandataires/edit-informations">
              {isTribunal ? "Modifier" : "Ajouter des tribunaux"}
            </Link>
          </Flex>
        </Card>
      </Flex>
      {isIndividuel({ type }) && (
        <Flex p={1} flexDirection="column" width="300px" tabIndex="0">
          <Box bg="cardSecondary">
            <Box p={1}>
              <Heading size={4}>Vos agréments</Heading>
            </Box>
          </Box>
          <Card>
            {listeBlanche?.mandataire_individuel_departements?.map(
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
        <Flex p={1} flexDirection="column" width="300px" tabIndex="0">
          <Box bg="cardSecondary">
            <Box p={1}>
              <Heading size={4}>Vos établissements</Heading>
            </Box>
          </Box>
          <Card>
            {listeBlanche?.mandataire_prepose_etablissements?.map(
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
}

export { MandataireBoard };
