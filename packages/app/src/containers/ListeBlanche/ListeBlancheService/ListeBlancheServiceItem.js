import { Flex } from "rebass";

import { Card, Text } from "~/components";
import capitalize from "~/utils/std/capitalize";

import { cardStyle, descriptionStyle, labelStyle } from "../style";

export function ListeBlancheServiceItem(props) {
  const { item, onClick, getHref } = props;

  const to = getHref && getHref(item, props);

  const { service } = item;

  return (
    <Card
      key={service.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
      title={`Service ${
        service?.etablissement ? capitalize(service.etablissement) : ""
      }`}
      aria-label={`Service ${
        service?.etablissement ? capitalize(service.etablissement) : ""
      }`}
      as="a"
      href={to}
      draggable={false}
    >
      <Flex justifyContent="flex-start">
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>{"Nom du service mandataire"}</Text>
          <Flex>
            <Text sx={descriptionStyle}>
              {service.etablissement ? service.etablissement.toUpperCase() : ""}
            </Text>
          </Flex>
        </Flex>

        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>Départements</Text>
          {service.departement && (
            <Text sx={descriptionStyle}>{service.departement.nom}</Text>
          )}
          <Text sx={descriptionStyle}>
            {service.departements
              .map(({ departement }) => departement.nom)
              .join(", ")}
          </Text>
        </Flex>

        <Flex width="45%" flexDirection="column">
          {service.siret && (
            <>
              <Text sx={labelStyle}>SIRET</Text>
              <Text sx={descriptionStyle}>{service.siret}</Text>
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}

export default ListeBlancheServiceItem;
