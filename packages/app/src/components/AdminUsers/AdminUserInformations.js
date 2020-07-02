import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Heading3, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import { Box, Flex } from "rebass";

import { isMandataire } from "../../../src/util";
import { AccessToken } from "../AccessToken";
import AdminUsersMagistratTribunal from "./AdminUsersMagistratTribunal";
import AdminUsersTribunaux from "./AdminUsersTribunaux";
import { ACTIVATE_USER, UPDATE_DIRECTION } from "./mutations";
import { USER } from "./queries";
import { TypeDirectionForm } from "./TypeDirectionForm";

const AdminUserInformations = (props) => {
  const { userId } = props;
  const { data, loading, error } = useQuery(USER, { variables: { userId } });
  const [activateUser] = useMutation(ACTIVATE_USER);
  const [updateDirection] = useMutation(UPDATE_DIRECTION);

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

  const { users_by_pk, regions, departements } = data;

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
            {(type === "individuel" || type === "prepose") && <AdminUsersTribunaux id={id} />}
          </Box>
        </Flex>
      )}

      <Flex>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Activer / Bloquer
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Button mr={2} bg={activateButtonStyle} onClick={toggleActivation}>
            {activateButtonText}
          </Button>
        </Box>
      </Flex>

      {type === "direction" && (
        <Box mt={4}>
          <Heading3 mb={4}>Type de direction</Heading3>
          <TypeDirectionForm
            onSubmit={async (values) => {
              await updateDirection({
                variables: {
                  id: direction.id,
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
