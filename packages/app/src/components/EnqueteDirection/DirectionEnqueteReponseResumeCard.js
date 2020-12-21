import { stdFormatter } from "@emjpm/biz";
import React from "react";
import { Flex } from "rebass";

import { Card, Text } from "~/ui";

const cardStyle = {
  mb: "1",
  overflow: "hidden",
  pl: "16px",
  position: "relative",
  width: "100%",
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  mb: "5px",
  mt: "7px",
};

const descriptionStyle = (style) => ({
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: style === "important" ? "600" : "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const getTypeLabel = (user_type) => {
  switch (user_type) {
    case "individuel":
      return "Mandataire individuel";
    case "prepose":
      return "Mandataire préposé d'établissement";
    case "service":
      return "Service";
  }
};

const getStatusLabel = (status) => {
  if (status === "draft") {
    return "En cours";
  }
  if (status === "submitted") {
    return "Réponse reçue";
  }
};

export const DirectionEnqueteReponseResumeCard = (props) => {
  const { item, renderActions } = props;
  return (
    <Card key={item.reponse_id} sx={cardStyle} mb="2">
      <Flex justifyContent="flex-start">
        <Flex width="50%" flexDirection="column">
          <Text sx={labelStyle}>{getTypeLabel(item.user_type)}</Text>
          {item.mandataire && item.mandataire.user ? (
            <Flex>
              <Text sx={descriptionStyle("important")}>
                {item.mandataire.user.nom
                  ? item.mandataire.user.nom.toUpperCase()
                  : ""}
              </Text>
              <Text pl="1" sx={descriptionStyle("important")}>
                {item.mandataire.user.prenom}
              </Text>
            </Flex>
          ) : (
            <Text sx={descriptionStyle("important")}>
              {item.service && item.service.etablissement
                ? item.service.etablissement.toUpperCase()
                : "---"}
            </Text>
          )}
        </Flex>
        <Flex width="50%" flexDirection="column">
          <Text sx={labelStyle}>{`Département`}</Text>
          <Flex>
            <Text sx={descriptionStyle()}>
              {item.departement
                ? `${item.departement.code} - ${item.departement.nom}`
                : "Inconnu"}
            </Text>
          </Flex>
        </Flex>

        <Flex width="50%" flexDirection="column">
          <Text sx={labelStyle}>{`Ville`}</Text>
          <Flex>
            {item.mandataire && (
              <Text sx={descriptionStyle()}>{item.mandataire.ville}</Text>
            )}
            {item.service && (
              <Text sx={descriptionStyle()}>{item.service.ville}</Text>
            )}
          </Flex>
        </Flex>
        <Flex width="50%" flexDirection="column">
          <Text sx={labelStyle}>{`Statut`}</Text>
          <Text sx={descriptionStyle("important")}>
            {getStatusLabel(item.status)}
          </Text>
          <Text sx={descriptionStyle()}>
            {item.submitted_at
              ? `${stdFormatter.formatDateUI(item.submitted_at)} (${
                  item.uploaded_on ? "import" : "manuel"
                })`
              : ""}
          </Text>
        </Flex>
        <Flex width="50%" flexDirection="column">
          {renderActions ? renderActions(item) : null}
        </Flex>
      </Flex>
    </Card>
  );
};
