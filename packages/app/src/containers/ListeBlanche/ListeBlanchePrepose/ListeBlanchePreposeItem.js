import { Flex } from "rebass";

import { Card, Text } from "~/components";

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "../style";

export function ListeBlanchePreposeItem(props) {
  const { item, onClick, getHref } = props;
  const { liste_blanche } = item;

  const { mandataire_prepose_etablissements: etablissements = [] } =
    liste_blanche;

  const to = getHref && getHref(item, props);
  return (
    <Card
      key={liste_blanche.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
    >
      <a href={to} onClick={onClick} style={anchorStyle} draggable="false">
        <Flex justifyContent="flex-start">
          <Flex width="25%" flexDirection="column">
            <Text sx={labelStyle}>{"Mandataire préposé d'établissement"}</Text>
            <Flex>
              <Text sx={descriptionStyle}>
                {liste_blanche.nom ? liste_blanche.nom.toUpperCase() : ""}
              </Text>
              <Text pl="1" sx={descriptionStyle}>
                {liste_blanche.prenom}
              </Text>
            </Flex>
          </Flex>
          <Flex width="30%" flexDirection="column">
            <Text sx={labelStyle}>Email</Text>
            <Text sx={descriptionStyle}>{item.email}</Text>
          </Flex>

          <Flex width="45%" flexDirection="column">
            {etablissements.length > 0 && (
              <>
                <Text sx={labelStyle}>{"Etablissements"}</Text>
                <Text sx={descriptionStyle}>
                  {etablissements
                    .map((e) => {
                      let str = e.etablissement.rslongue;
                      if (e.etablissement.departement) {
                        str += ` (${e.etablissement.departement.id})`;
                      }
                      if (e.etablissement_rattachement) {
                        str += " (Rattaché)";
                      }
                      return str;
                    })
                    .join(", ")}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </a>
    </Card>
  );
}

export default ListeBlanchePreposeItem;
