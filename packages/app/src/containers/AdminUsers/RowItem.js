import { useCallback } from "react";
import {
  DIRECTION_TYPE,
  isDirection,
  isIndividuel,
  isPrepose,
} from "@emjpm/biz";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { Card } from "~/components";

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "./style";

import ImpersonateButton from "~/containers/ImpersonateButton";

export default function RowItem({ item }) {
  const {
    id,
    nom,
    prenom,
    email,
    type,
    active,
    mandataire,
    service_members,
    directions,
    magistrat,
  } = item;

  const history = useHistory();

  let labelNbMesures;
  switch (type) {
    case "prepose":
    case "individuel":
    case "service":
      let mesures_awaiting = 0;
      let mesures_in_progress = 0;
      let dispo_max;
      switch (type) {
        case "prepose":
        case "individuel":
          mesures_in_progress = mandataire?.mesures_en_cours || 0;
          mesures_awaiting = mandataire?.mesures_en_attente || 0;
          dispo_max = mandataire?.dispo_max || 0;
          break;
        case "service":
          const service = service_members[0]?.service;
          mesures_in_progress = service?.mesures_in_progress || 0;
          mesures_awaiting = service?.mesures_awaiting || 0;
          dispo_max = service?.dispo_max || 0;
          break;
      }
      const nb_mesures = mesures_awaiting + mesures_in_progress;
      labelNbMesures = `${nb_mesures}/${dispo_max}`;
      break;
    case "ti":
      const nbMesures = magistrat?.ti?.nb_mesures || 0;
      labelNbMesures = `${nbMesures}`;
      break;
  }

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
                  <Text sx={labelStyle}>liste blanche</Text>
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
              {labelNbMesures && (
                <Flex width="100px" flexDirection="column">
                  <Text sx={labelStyle}>mesures</Text>
                  <Text sx={descriptionStyle}>{labelNbMesures}</Text>
                </Flex>
              )}
            </Flex>
          </a>
          {type !== "admin" && (
            <Flex justifyContent="flex-end" width="45px">
              <Flex width="45px" flexDirection="column">
                <ImpersonateButton userId={id} />
              </Flex>
            </Flex>
          )}
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
