import { Card, Text } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { cardStyle, descriptionStyle, labelStyle } from "../style";

export const ListeBlancheServiceItem = (props) => {
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
          <Text sx={labelStyle}>{"Nom du service"}</Text>
          <Flex>
            <Text sx={descriptionStyle}>
              {item.etablissement ? item.etablissement.toUpperCase() : ""}
            </Text>
          </Flex>
        </Flex>

        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>Département</Text>
          {item.departement && <Text sx={descriptionStyle}>{item.departement.nom}</Text>}
        </Flex>

        {item.siret && (
          <Flex width="15%" flexDirection="column">
            <Text sx={labelStyle}>SIRET</Text>
            <Text sx={descriptionStyle}>{item.siret}</Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default ListeBlancheServiceItem;
