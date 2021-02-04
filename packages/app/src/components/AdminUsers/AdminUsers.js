import { useContext, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import {
  DIRECTION_TYPE,
  isDirection,
  isIndividuel,
  isPrepose,
} from "@emjpm/biz";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "~/components/AdminFilterBar/context";
import { Link } from "~/components/Link";
import { PaginatedList } from "~/components/PaginatedList";
import { Button, Card } from "~/ui";

import { USERS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogin, useAuth } from "~/routes/Auth";

function RowItem({ item }) {
  const { id, nom, prenom, email, type, active, mandataire, directions } = item;

  const { authStore } = useAuth();
  const { token } = authStore;
  const impersonate = useCallback(() => {
    impersonateLogin({ id, token });
  }, [id, token]);

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
          <Flex justifyContent="flex-end" width="180px">
            <Flex width="100px" flexDirection="column">
              <Box mr="1" width="120px">
                <Link to={`/admin/users/${id}`}>
                  <Button>Voir</Button>
                </Link>
              </Box>
            </Flex>
            <Flex width="80px" flexDirection="column">
              <Box mr="1" width="120px">
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#007AD9",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                  }}
                  onClick={impersonate}
                >
                  <UserSecret
                    size={18}
                    style={{ color: "#333", height: "100%" }}
                  />
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

function AdminUsers() {
  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, debouncedSearchId, selectedType } = useContext(
    AdminFilterContext
  );

  useEffectObjectValuesChangeCallback(
    { debouncedSearchText, selectedType },
    () => {
      if (currentOffset !== 0) {
        setCurrentOffset(0);
      }
    }
  );

  const { data, error, loading } = useQuery(USERS, {
    fetchPolicy: "network-only",

    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      searchId: debouncedSearchId,
      searchText:
        debouncedSearchText && debouncedSearchText !== ""
          ? `%${debouncedSearchText}%`
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
}

export { AdminUsers };

function getDirectionLabel({ type, directions }) {
  let directionLabel = " - ";
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
