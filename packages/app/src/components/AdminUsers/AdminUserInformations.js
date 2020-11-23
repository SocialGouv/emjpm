import { useMutation, useQuery } from "@apollo/react-hooks";
import { Heading3, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { CHANGE_DIRECTION_AGREMENT } from "./mutations";
import { USER } from "./queries";
import { TypeDirectionForm } from "./TypeDirectionForm";

const AdminUserInformations = (props) => {
  const { userId } = props;

  const { data, loading, error } = useQuery(USER, {
    variables: { userId },
  });

  const [changeDirectionAgrements] = useMutation(CHANGE_DIRECTION_AGREMENT);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { users_by_pk, regions, departements, directionRoles } = data;

  const {
    id,
    type,
    service_members,
    nom,
    prenom,
    email,
    directions,
  } = users_by_pk;

  const [direction] = directions;

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

      {type === "service" && (
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
      )}

      {type === "direction" && (
        <Box mt={4}>
          <Heading3 mb={4}>Type de direction</Heading3>
          <TypeDirectionForm
            onSubmit={async (values) => {
              const newDirectionRoleName =
                values.type !== "national"
                  ? "direction_territoriale"
                  : "direction_nationale";
              const newDirectionRole = directionRoles.find(
                (d) => d.name === newDirectionRoleName
              );
              const directionRole = directionRoles.find(
                (d) => d.name === "direction"
              );

              await changeDirectionAgrements({
                variables: {
                  department_id: values.departement || null,
                  direction_id: direction.id,
                  direction_role_id: newDirectionRole.id,
                  new_direction_role_id: directionRole.id,
                  region_id: values.region || null,
                  type: values.type,
                  user_id: userId,
                },
              });
            }}
            regions={regions}
            departements={departements}
            direction={direction}
          />
        </Box>
      )}
    </Fragment>
  );
};

export { AdminUserInformations };
