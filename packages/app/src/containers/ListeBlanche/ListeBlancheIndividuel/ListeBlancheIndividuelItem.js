import { Flex } from "rebass";

import { Card, Text } from "~/components";

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "../style";

export function ListeBlancheIndividuelItem(props) {
  const { item, getHref, onClick } = props;
  const to = getHref && getHref(item, props);

  const { liste_blanche } = item;
  const { mandataire } = liste_blanche;

  return (
    <Card
      key={liste_blanche.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
    >
      <a
        href={to}
        onClick={onClick}
        style={anchorStyle}
        draggable="false"
        title={`Mandataire individuel ${liste_blanche?.nom || ""} ${
          liste_blanche?.prenom || ""
        }`}
        aria-label={`Mandataire individuel ${liste_blanche?.nom || ""} ${
          liste_blanche?.prenom || ""
        }`}
      >
        <Flex justifyContent="flex-start">
          <Flex width="25%" flexDirection="column">
            <Text sx={labelStyle}>{"Mandataire individuel"}</Text>
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
          <Flex width="15%" flexDirection="column">
            <Text sx={labelStyle}>SIRET</Text>
            <Text sx={descriptionStyle}>{item.siret}</Text>
          </Flex>
          <Flex width="10%" flexDirection="column">
            <Text sx={labelStyle}>Utilisateur</Text>
            <Text sx={descriptionStyle}>{mandataire ? "oui" : "non"}</Text>
          </Flex>

          <Flex width="20%" flexDirection="column">
            <Text sx={labelStyle}>{"Département"}</Text>
            <Text sx={descriptionStyle}>
              {liste_blanche.mandataire_individuel_departements
                .map((lbDep) =>
                  `${
                    lbDep.departement ? lbDep.departement.nom : "Inconnu"
                  }`.concat(lbDep.departement_financeur ? " (Financeur)" : "")
                )
                .join(", ")}
            </Text>
          </Flex>
        </Flex>
      </a>
    </Card>
  );
}

export default ListeBlancheIndividuelItem;
