import { useCallback } from "react";
import {
  DIRECTION_TYPE,
  isDirection,
  isIndividuel,
  isPrepose,
} from "@emjpm/biz";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { Button, Card } from "~/components";

import { cardStyle, descriptionStyle, labelStyle } from "./style";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogin, useAuth } from "~/user/Auth";

export default function RowItem({ item }) {
  const { id, nom, prenom, email, type, active, mandataire, directions } = item;

  const history = useHistory();
  const { authStore } = useAuth();
  const { token } = authStore;
  const impersonate = useCallback(() => {
    impersonateLogin({ id, token });
  }, [id, token]);

  const onRowClick = useCallback(() => history.push(`/admin/users/${id}`), [
    id,
    history,
  ]);

  return (
    <>
      <Card sx={cardStyle(active)} width="100%" onClick={onRowClick}>
        <Flex justifyContent="space-between">
          <Flex justifyContent="flex-start">
            <Flex width="46px" flexDirection="column">
              <Text sx={labelStyle}>id</Text>
              <Text sx={descriptionStyle}>{id}</Text>
            </Flex>
            <Flex width="80px" flexDirection="column">
              <Text sx={labelStyle}>type</Text>
              <Text sx={descriptionStyle}>{type}</Text>
            </Flex>
            <Box width="300px">
              <Text sx={labelStyle}>email</Text>
              <Text sx={descriptionStyle}>{email}</Text>
            </Box>
            <Flex width="200px" flexDirection="column">
              <Text sx={labelStyle}>prénom / nom</Text>
              <Text sx={descriptionStyle}>
                {prenom} {nom}
              </Text>
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
            {/* <Flex width="100px" flexDirection="column">
              <Box mr="1" width="120px">
                <Link to={`/admin/users/${id}`}>
                  <Button>Voir</Button>
                </Link>
              </Box>
            </Flex> */}
            <Flex width="80px" flexDirection="column">
              <Box mr="1" width="120px">
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#007AD9",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    padding: "12px",
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
