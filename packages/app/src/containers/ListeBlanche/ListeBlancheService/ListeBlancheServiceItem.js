import { Flex } from "rebass";

import { Card, Text } from "~/components";

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "../style";

export function ListeBlancheServiceItem(props) {
  const { item, onClick, getHref } = props;

  const to = getHref && getHref(item, props);

  const { service } = item;

  return (
    <Card key={service.id} sx={cardStyle({ clickable: !!onClick })} mb="2">
      <a href={to} onClick={onClick} style={anchorStyle} draggable="false">
        <Flex justifyContent="flex-start">
          <Flex width="25%" flexDirection="column">
            <Text sx={labelStyle}>{"Nom du service"}</Text>
            <Flex>
              <Text sx={descriptionStyle}>
                {service.etablissement
                  ? service.etablissement.toUpperCase()
                  : ""}
              </Text>
            </Flex>
          </Flex>

          <Flex width="30%" flexDirection="column">
            <Text sx={labelStyle}>Département</Text>
            {service.departement && (
              <Text sx={descriptionStyle}>{service.departement.nom}</Text>
            )}
          </Flex>

          {service.siret && (
            <Flex width="15%" flexDirection="column">
              <Text sx={labelStyle}>SIRET</Text>
              <Text sx={descriptionStyle}>{service.siret}</Text>
            </Flex>
          )}
        </Flex>
      </a>
    </Card>
  );
}

export default ListeBlancheServiceItem;
