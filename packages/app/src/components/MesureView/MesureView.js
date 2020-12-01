import { MESURE_PROTECTION_STATUS, mesureFormatter } from "@emjpm/core";
import { Card, Heading3 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { getUserBasePath } from "../../constants";
import { LinkButton } from "../Commons";
import { MesureContext } from "../MesureContext";
import { UserContext } from "../UserContext";
import { content, statusBox, subtitle, title } from "./style";

export const MesureView = (props) => {
  const {
    realAge,
    cabinet,
    civilite,
    dateNominationFormated,
    numeroDossier,
    numeroRg,
    lieuVie,
    status,
    tribunal,
    natureMesure,
    champMesure,
    ville,
    pays,
    codePostal,
    antenne,
    id,
    mesureEtats,
    mesureRessources,
  } = useContext(MesureContext);

  const { type } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  const {
    formatNatureMesure,
    formatChampMesure,
    formatStatus,
    formatMajeurProtege,
    formatLieuVie,
    formatPays,
  } = mesureFormatter;

  return (
    <Box {...props}>
      <Card p={4}>
        <Box px="3" pt="1" my={1}>
          <Flex justifyContent="space-between" mb="3" flexWrap="wrap">
            <Flex>
              <Heading3 sx={title}>{`${formatNatureMesure(
                natureMesure
              )} ${formatChampMesure(champMesure)}`}</Heading3>
              <Heading3 ml={2} color="textSecondary">{`${numeroRg}`}</Heading3>
            </Flex>
            <Box>
              <Text mx="auto" sx={statusBox(status)}>
                {formatStatus(status)}
              </Text>
            </Box>
          </Flex>
          <Flex my={1}>
            <Box flex="1">
              <Box mb={2}>
                <Text sx={subtitle}>Majeur protégé</Text>
                <Text sx={content}>
                  {formatMajeurProtege(civilite, realAge)}
                </Text>
              </Box>
              {lieuVie && (
                <Box mb={2}>
                  <Text sx={subtitle}>Lieu de vie du majeur</Text>
                  <Text sx={content}>{formatLieuVie(lieuVie)}</Text>
                </Box>
              )}

              {codePostal && (
                <Box mb={2}>
                  <Text sx={subtitle}>Commune</Text>
                  <Text sx={content}>
                    {codePostal} {ville} ({formatPays(pays)})
                  </Text>
                </Box>
              )}
            </Box>

            <Box flex="1">
              <Box mb={2}>
                <Text sx={subtitle}>Tribunal</Text>
                <Text sx={content}>
                  {tribunal} {cabinet ? `(${cabinet})` : ""}
                </Text>
              </Box>

              {dateNominationFormated && (
                <Box mb={2}>
                  <Text sx={subtitle}>Decision du</Text>
                  <Text sx={content}>{dateNominationFormated}</Text>
                </Box>
              )}

              {antenne && (
                <Box mb={2}>
                  <Text sx={subtitle}>Antenne</Text>
                  <Text sx={content}>{antenne}</Text>
                </Box>
              )}

              {numeroDossier && (
                <Box mb={2}>
                  <Text sx={subtitle}>Numéro de dossier</Text>
                  <Text sx={content}>{numeroDossier}</Text>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
        {mesureEtats.length > 0 && (
          <Box px="3" pt="1">
            <Heading3>{`Changement d'états`}</Heading3>
            <Flex flexDirection="column" my={1}>
              {mesureEtats.map((etat) => (
                <Flex key={etat.id} justifyContent="flex-start" mb={1}>
                  <Box width="150px">
                    <Text sx={subtitle}>{`Changement d'état`}</Text>
                    <Text sx={content}>{etat.dateChangementEtat}</Text>
                  </Box>
                  <Box width="200px">
                    <Text sx={subtitle}>Mesure</Text>
                    <Box sx={content}>
                      <Text>{formatNatureMesure(etat.natureMesure)}</Text>
                      <Text>{formatChampMesure(etat.champMesure)}</Text>
                    </Box>
                  </Box>
                  <Box width="150px">
                    <Text sx={subtitle}>Lieu de vie</Text>
                    <Text sx={content}>{formatLieuVie(etat.lieuVie)}</Text>
                  </Box>

                  <Box width="250px">
                    <Text sx={subtitle}>Commune</Text>
                    <Text sx={content}>
                      {etat.codePostal} {etat.ville} ({formatPays(etat.pays)})
                    </Text>
                  </Box>
                  <Box>
                    <Text sx={subtitle}>Etablissement</Text>
                    <Text sx={content}>
                      {mesureFormatter.formatTypeEtablissement(
                        etat.typeEtablissement
                      )}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>
        )}

        {mesureRessources.length > 0 && (
          <Box px="3" pt="1">
            <Heading3>{`Ressources`}</Heading3>
            <Flex flexDirection="column">
              {mesureRessources.map((ressource) => (
                <Flex key={ressource.id} justifyContent="flex-start" mt={1}>
                  <Box width="100px">
                    <Text sx={subtitle}>{`Année`}</Text>
                    <Text sx={content}>{ressource.annee}</Text>
                  </Box>
                  <Box width="150px">
                    <Text sx={subtitle}>Ressource</Text>
                    <Text sx={content}>{ressource.niveauRessource} €</Text>
                  </Box>

                  <Box>
                    <Text sx={subtitle}>Prestations soc.</Text>
                    <Text sx={content}>{ressource.prestationsSociales}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>
        )}

        <Box textAlign="center" pt={4}>
          <LinkButton
            outline={true}
            mr={3}
            bg="red"
            color="white"
            href={`${userBasePath}/mesures/[mesure_id]/delete`}
            asLink={`${userBasePath}/mesures/${id}/delete`}
          >
            Supprimer la mesure
          </LinkButton>

          {status === MESURE_PROTECTION_STATUS.en_attente && (
            <LinkButton
              outline={true}
              href={`${userBasePath}/mesures/[mesure_id]/accept`}
              asLink={`${userBasePath}/mesures/${id}/accept`}
            >
              Accepter la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.eteinte && (
            <LinkButton
              ml={3}
              outline={true}
              href={`${userBasePath}/mesures/[mesure_id]/reactivate`}
              asLink={`${userBasePath}/mesures/${id}/reactivate`}
            >
              Réouvrir la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.en_cours && (
            <Fragment>
              <LinkButton
                bg="red"
                color="white"
                outline={true}
                href={`${userBasePath}/mesures/[mesure_id]/close`}
                asLink={`${userBasePath}/mesures/${id}/close`}
              >
                Cloturer la mesure
              </LinkButton>

              <LinkButton
                ml={3}
                outline={true}
                href={`${userBasePath}/mesures/[mesure_id]/edit`}
                asLink={`${userBasePath}/mesures/${id}/edit`}
              >
                Modifier la mesure
              </LinkButton>
            </Fragment>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default MesureView;
