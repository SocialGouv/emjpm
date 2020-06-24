import { Card, Text } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Flex } from "rebass";

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

const getTypeLabel = (type) => {
  if (type === "individuel") {
    return "Mandataire individuel";
  }
  if (type === "prepose") {
    return "Mandataire préposé d'établissement";
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

export const DirectionEnqueteReponseResumeCard = ({ item }) => (
  <Card key={item.reponse_id} sx={cardStyle} mb="2">
    <Flex justifyContent="flex-start">
      <Flex width="50%" flexDirection="column">
        <Text sx={labelStyle}>{getTypeLabel(item.user.type)}</Text>
        <Flex>
          <Text sx={descriptionStyle("important")}>
            {item.user.nom ? item.user.nom.toUpperCase() : ""}
          </Text>
          <Text pl="1" sx={descriptionStyle("important")}>
            {item.user.prenom}
          </Text>
        </Flex>
      </Flex>
      <Flex width="50%" flexDirection="column">
        <Text sx={labelStyle}>{`Département`}</Text>
        <Flex>
          <Text sx={descriptionStyle()}>
            {item.departement ? `${item.departement.code} - ${item.departement.nom}` : "Inconnu"}
          </Text>
        </Flex>
      </Flex>

      <Flex width="50%" flexDirection="column">
        <Text sx={labelStyle}>{`Ville`}</Text>
        <Flex>
          <Text sx={descriptionStyle()}>{item.ville}</Text>
        </Flex>
      </Flex>
      <Flex width="50%" flexDirection="column">
        <Text sx={labelStyle}>{`Statut`}</Text>
        <Text sx={descriptionStyle("important")}>{getStatusLabel(item.status)}</Text>
        <Text sx={descriptionStyle()}>
          {item.submitted_at ? format(new Date(item.submitted_at), "dd/MM/yyyy") : ""}
        </Text>
      </Flex>
    </Flex>
  </Card>
);
