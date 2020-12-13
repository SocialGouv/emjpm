import { useQuery } from "@apollo/react-hooks";
import {
  DIRECTION_TYPE,
  isDirection,
  isIndividuel,
  isPrepose,
} from "@emjpm/core";
import { Button, Card } from "@emjpm/ui";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { USERS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, nom, prenom, email, type, active, mandataire, directions } = item;

  return (
    <>
      <Card sx={cardStyle(active)} width="100%">
        <Flex justifyContent="space-between">
          <Flex justifyContent="flex-start">
            <Flex width="100px" flexDirection="column">
              <Text sx={labelStyle}>id</Text>
              <Text sx={descriptionStyle}>{id}</Text>
              <Text sx={descriptionStyle}>{type}</Text>
            </Flex>
            <Box width="300px">
              <Text sx={labelStyle}>email</Text>
              <Text sx={descriptionStyle}>{email}</Text>
            </Box>
            <Flex width="200px" flexDirection="column">
              <Text sx={labelStyle}>prénom / nom</Text>
              <Text sx={descriptionStyle}>{prenom}</Text>
              <Text sx={descriptionStyle}>{nom}</Text>
            </Flex>
            <Flex width="100px" flexDirection="column">
              <Text sx={labelStyle}>état</Text>
              <Text sx={descriptionStyle}>
                {active ? "activé" : "non activé"}
              </Text>
            </Flex>
            {isIndividuel({ type } || isPrepose({ type })) && (
              <Flex width="100px" flexDirection="column">
                <Text sx={labelStyle}>Liste Blanche</Text>
                <Text sx={descriptionStyle}>
                  {mandataire.lb_user_id ? "oui" : "non"}
                </Text>
              </Flex>
            )}
            {isDirection({ type }) && (
              <Flex width="100px" flexDirection="column">
                <Text sx={labelStyle}>Direction</Text>
                <Text sx={descriptionStyle}>
                  {getDirectionLabel({ directions, type })}
                </Text>
              </Flex>
            )}
          </Flex>
          <Box mr="1" width="120px">
            <Link href={`/admin/users/[user_id]`} as={`/admin/users/${id}`}>
              <Button>Voir</Button>
            </Link>
          </Box>
        </Flex>
      </Card>
    </>
  );
};

const AdminUsers = () => {
  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, selectedType } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(USERS, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      searchText:
        debouncedSearchText && debouncedSearchText !== ""
          ? `${debouncedSearchText}%`
          : null,
      type: selectedType,
    },
  });

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    console.error(error);
    return <Text>Oups, une erreur est survenue.</Text>;
  }

  const { count } = data.users_aggregate.aggregate;
  const users = data.users;

  return (
    <PaginatedList
      entries={users}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminUsers };

function getDirectionLabel({ type, directions }) {
  let directionLabel = ` - `;
  if (isDirection({ type })) {
    const direction = directions[0];
    if (direction) {
      if (direction.type === DIRECTION_TYPE.national) {
        directionLabel = "DGCS";
      } else {
        const directionRegion = direction.region
          ? direction.region.nom
          : undefined;
        const directionDepartement = direction.departement
          ? direction.departement.nom
          : undefined;
        const directionDetail = directionRegion
          ? directionRegion
          : directionDepartement;
        directionLabel = `${directionDetail}`;
      }
    }
  }
  return directionLabel;
}
