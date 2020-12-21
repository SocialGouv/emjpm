import React from "react";
import { Flex } from "rebass";

import { Card, Text } from "~/ui";

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
            <Text sx={descriptionStyle}>
              {item.nom ? item.nom.toUpperCase() : ""}
            </Text>
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
            <Text sx={labelStyle}>{`Etablissements`}</Text>
            <Text sx={descriptionStyle}>
              {etablissements
                .map((e) => {
                  let str = e.etablissement.rslongue;
                  if (e.etablissement.departement) {
                    str += ` (${e.etablissement.departement.code})`;
                  }
                  if (e.etablissement_rattachement) {
                    str += " (Rattaché)";
                  }
                  return str;
                })
                .join(", ")}
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default ListeBlanchePreposeItem;
