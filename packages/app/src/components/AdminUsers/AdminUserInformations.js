import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Heading3, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import { Box, Flex } from "rebass";

import { isIndividuel, isMandataire } from "../../../src/util";
import { AccessToken } from "../AccessToken";
import AdminMandataireTribunaux from "./AdminMandataireTribunaux";
import { AdminUserListeBlancheMandataireAssociation } from "./AdminUserListeBlancheMandataireAssociation";
import AdminUsersMagistratTribunal from "./AdminUsersMagistratTribunal";
import { ACTIVATE_USER, CHANGE_DIRECTION_AGREMENT } from "./mutations";
import { LB_USER, USER } from "./queries";
import { TypeDirectionForm } from "./TypeDirectionForm";

const AdminUserInformations = (props) => {
  const { userId } = props;

  const [execQuery, queryResult] = useLazyQuery(LB_USER);
  const { data, loading, error } = useQuery(USER, {
    onCompleted: async (data) => {
      if (data) {
        const { type, email, mandataire } = data.users_by_pk;
        if (isMandataire(type)) {
          if (isIndividuel(type) && mandataire.siret) {
            await execQuery({
              variables: {
                where: {
                  siret: { _eq: mandataire.siret },
                },
              },
            });
          } else {
            await execQuery({
              variables: {
                where: {
                  email: { _eq: email },
                },
              },
            });
          }
        }
      }
    },
    variables: { userId },
  });

  const [activateUser, { loading: activateUserLoading }] = useMutation(ACTIVATE_USER);
  const [changeDirectionAgrements] = useMutation(CHANGE_DIRECTION_AGREMENT);

  const lb_user =
    queryResult.data && queryResult.data.lb_users.length ? queryResult.data.lb_users[0] : null;

  const toggleActivation = useCallback(() => {
    const { active, id } = data.users_by_pk;
    activateUser({
      variables: {
        active: !active,
        id,
      },
    });
  }, [activateUser, data]);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { users_by_pk, regions, departements, directionRoles } = data;

  const {
    active,
    id,
    type,
    service_members,
    mandataire,
    nom,
    prenom,
    email,
    directions,
  } = users_by_pk;

  const [direction] = directions;
  const activateButtonStyle = active ? "warning" : "primary";
  const activateButtonText = active ? "Bloquer" : "Activer";

  return (
    <Fragment>
      <Heading3 mb={4}>Informations générales</Heading3>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Type
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{type}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Email
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{email}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Nom / Prenom
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>
            {prenom} {nom}
          </Text>
        </Box>
      </Flex>
      {isMandataire(type) && (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            SIRET
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            <Text>{mandataire.siret}</Text>
          </Box>
        </Flex>
      )}

      {type === "service" ? (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            Service
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            {service_members &&
              service_members.map((val) => {
                const { etablissement, id } = val.service;
                return (
                  <Link
                    href={`/admin/services/[service_id]`}
                    as={`/admin/services/${id}`}
                    key={`aui-${etablissement}`}
                  >
                    {etablissement}
                  </Link>
                );
              })}
          </Box>
        </Flex>
      ) : (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            Tribunaux
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            {type === "ti" && <AdminUsersMagistratTribunal id={id} />}
            {(type === "individuel" || type === "prepose") && (
              <AdminMandataireTribunaux mandataireId={mandataire.id} />
            )}
          </Box>
        </Flex>
      )}

      {isMandataire(type) && (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            Liste blanche
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            <AdminUserListeBlancheMandataireAssociation
              mandataire={mandataire}
              userId={userId}
              lb_user={lb_user}
            />
          </Box>
        </Flex>
      )}

      <Flex>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Activer / Bloquer
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Flex alignItems="center">
            <Box>
              <Button
                disabled={isMandataire(type) && !mandataire.lb_user}
                mr={2}
                bg={activateButtonStyle}
                onClick={toggleActivation}
                isLoading={activateUserLoading}
              >
                {activateButtonText}
              </Button>
            </Box>

            {isMandataire(type) && mandataire && !mandataire.lb_user && (
              <Box ml={4} flex={1}>
                <span aria-label="information" role="img">
                  ℹ️
                </span>
                <Text ml={1} as="span">
                  {
                    " L'activation / désactivation requiert que l'utilisateur soit associé à un enregistrement dans la liste blanche."
                  }
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>

      {type === "direction" && (
        <Box mt={4}>
          <Heading3 mb={4}>Type de direction</Heading3>
          <TypeDirectionForm
            onSubmit={async (values) => {
              const newDirectionRoleName =
                values.type !== "national" ? "direction_territoriale" : "direction_nationale";
              const newDirectionRole = directionRoles.find((d) => d.name === newDirectionRoleName);
              const directionRole = directionRoles.find((d) => d.name === "direction");

              await changeDirectionAgrements({
                variables: {
                  user_id: userId,
                  direction_id: direction.id,
                  direction_role_id: newDirectionRole.id,
                  new_direction_role_id: directionRole.id,
                  type: values.type,
                  department_id: values.departement || null,
                  region_id: values.region || null,
                },
              });
            }}
            regions={regions}
            departements={departements}
            direction={direction}
          />
        </Box>
      )}

      <Box mt="2">
        <AccessToken bg="cardSecondary" isAdmin userId={id} />
      </Box>
    </Fragment>
  );
};

export { AdminUserInformations };
