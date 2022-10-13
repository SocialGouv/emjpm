import { useMemo } from "react";
import { Flex } from "rebass";

import { Card, Text } from "~/components";
import capitalize from "~/utils/std/capitalize";

import { cardStyle, descriptionStyle, labelStyle } from "../style";

export function ListeBlancheSdpfItem(props) {
  const { item, onClick, getHref, sdpfdepartements } = props;

  const to = getHref && getHref(item, props);

  const { sdpf: service } = item;

  const sdpfDep = useMemo(() => {
    if (service && service?.departement) {
      return sdpfdepartements.find((d) => d.id === service.departement);
    }
    return {};
  }, [sdpfdepartements, service]);

  if (!service) {
    return null;
  }

  return (
    <Card
      key={service.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
      title={`Service Service DPF ${
        service?.etablissement ? capitalize(service.etablissement) : ""
      }`}
      aria-label={`Service DPF ${
        service?.etablissement ? capitalize(service.etablissement) : ""
      }`}
      as="a"
      href={to}
      draggable={false}
    >
      <Flex justifyContent="flex-start">
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>{"Nom du service DPF"}</Text>
          <Flex>
            <Text sx={descriptionStyle}>
              {service?.etablissement
                ? service.etablissement.toUpperCase()
                : ""}
            </Text>
          </Flex>
        </Flex>

        <Flex width="30%" flexDirection="column">
          <Text sx={labelStyle}>Départements</Text>

          {service?.departement && (
            <Text sx={descriptionStyle}>{sdpfDep.nom}</Text>
            // <Text sx={descriptionStyle}>{service.departement}</Text>
          )}
        </Flex>

        <Flex width="45%" flexDirection="column">
          {service?.siret && (
            <>
              <Text sx={labelStyle}>SIRET</Text>
              <Text sx={descriptionStyle}>
                {service.siret.startsWith("sdpf_")
                  ? service.siret.split("sdpf_")
                  : service.siret}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}

export default ListeBlancheSdpfItem;
