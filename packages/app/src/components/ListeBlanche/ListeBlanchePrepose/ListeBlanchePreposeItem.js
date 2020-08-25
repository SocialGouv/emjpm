import { Card, Text } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { cardStyle, descriptionStyle, labelStyle } from "../style";

export const ListeBlanchePreposeItem = (props) => {
  const { item, onClick } = props;
  const { lb_user_etablissements: etablissements = [] } = item;

  return (
    <Card
      key={item.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
      onClick={() => (onClick ? onClick(item) : null)}
    >
      <Flex justifyContent="flex-start">
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>{"Mandataire préposé d'établissement"}</Text>
          <Flex>
            <Text sx={descriptionStyle}>{item.nom ? item.nom.toUpperCase() : ""}</Text>
            <Text pl="1" sx={descriptionStyle}>
              {item.prenom}
            </Text>
          </Flex>
        </Flex>
        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>Email</Text>
          <Text sx={descriptionStyle}>{item.email}</Text>
        </Flex>

        {etablissements.length > 0 && (
          <Flex width="30%" flexDirection="column">
            <Text sx={labelStyle}>{`Départements`}</Text>
            <Text sx={descriptionStyle}>
              {etablissements
                .map((e) =>
                  e.etablissement.nom.concat(e.etablissement_rattachement ? " (Rattaché)" : "")
                )
                .join(", ")}
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default ListeBlanchePreposeItem;
