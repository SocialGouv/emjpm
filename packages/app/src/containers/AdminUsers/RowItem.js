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

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "./style";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogin, useAuth } from "~/user/Auth";

export default function RowItem({ item }) {
  const { id, nom, prenom, email, type, active, mandataire, directions } = item;

  const history = useHistory();
  const { authStore } = useAuth();
  const { token } = authStore;
  const onClickImpersonate = useCallback(() => {
    impersonateLogin({ id, token });
  }, [id, token]);

  const to = `/admin/users/${id}`;
  const onRowClick = useCallback(
    (e) => {
      if (e.ctrlKey) {
        return;
      }
      e.preventDefault();
      const selection = window.getSelection().toString();
      if (selection.length > 0) {
        return;
      }
      history.push(to);
    },
    [history, to]
  );

  return (
    <>
      <Card sx={cardStyle(active)} width="100%">
        <Flex justifyContent="space-between">
          <a
            href={to}
            onClick={onRowClick}
            style={anchorStyle}
            draggable="false"
          >
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
          </a>
          <Flex justifyContent="flex-end" width="45px">
            <Flex width="45px" flexDirection="column">
              <Button
                as="a"
                style={{
                  backgroundColor: "white",
                  borderColor: "#007AD9",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 5,
                  padding: "12px",
                }}
                onClick={onClickImpersonate}
              >
                <UserSecret
                  size={18}
                  style={{ color: "#333", height: "100%" }}
                />
              </Button>
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
