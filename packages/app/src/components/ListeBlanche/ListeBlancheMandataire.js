import { Card, Text } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { cardStyle, descriptionStyle, labelStyle } from "./style";

const getType = (type) => {
  if (type === "individuel") {
    return "Mandataire individuel";
  }
  if (type === "prepose") {
    return "Mandataire préposé d'établissement";
  }
};

export const ListeBlancheMandataire = (props) => {
  const { item, onClick } = props;
  return (
    <Card
      key={item.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
      onClick={() => (onClick ? onClick(item) : null)}
    >
      <Flex justifyContent="flex-start">
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>{getType(item.type)}</Text>
          <Flex>
            <Text sx={descriptionStyle}>{item.nom ? item.nom.toUpperCase() : ""}</Text>
            <Text pl="1" sx={descriptionStyle}>
              {item.prenom}
            </Text>
          </Flex>
        </Flex>
        <Flex width="15%" flexDirection="column">
          <Text sx={labelStyle}>SIRET</Text>
          <Text sx={descriptionStyle}>{item.siret}</Text>
        </Flex>
        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>Email</Text>
          <Text sx={descriptionStyle}>{item.email}</Text>
        </Flex>
        <Flex width="10%" flexDirection="column">
          <Text sx={labelStyle}>Utilisateur</Text>
          <Text sx={descriptionStyle}>{item.mandataire ? "oui" : "non"}</Text>
        </Flex>

        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>{`Départements`}</Text>
          <Text sx={descriptionStyle}>
            {item.lb_departements
              .map((lbDep) =>
                `${lbDep.departement ? lbDep.departement.nom : "Inconnu"}`.concat(
                  lbDep.departement_financeur ? " (Financeur)" : ""
                )
              )
              .join(", ")}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ListeBlancheMandataire;
