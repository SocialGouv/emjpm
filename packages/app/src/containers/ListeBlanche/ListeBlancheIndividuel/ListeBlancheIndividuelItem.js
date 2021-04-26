import { Flex } from "rebass";

import { Card, Text } from "~/components";

import { cardStyle, descriptionStyle, labelStyle, anchorStyle } from "../style";

export function ListeBlancheIndividuelItem(props) {
  const { item, getHref, onClick } = props;
  const to = getHref && getHref(item, props);

  const { lb_user } = item;
  const { mandataire } = lb_user;

  return (
    <Card key={item.id} sx={cardStyle({ clickable: !!onClick })} mb="2">
      <a href={to} onClick={onClick} style={anchorStyle} draggable="false">
        <Flex justifyContent="flex-start">
          <Flex width="25%" flexDirection="column">
            <Text sx={labelStyle}>{"Mandataire individuel"}</Text>
            <Flex>
              <Text sx={descriptionStyle}>
                {lb_user.nom ? lb_user.nom.toUpperCase() : ""}
              </Text>
              <Text pl="1" sx={descriptionStyle}>
                {lb_user.prenom}
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
            <Text sx={descriptionStyle}>{mandataire ? "oui" : "non"}</Text>
          </Flex>

          <Flex width="30%" flexDirection="column">
            <Text sx={labelStyle}>{"Départements"}</Text>
            <Text sx={descriptionStyle}>
              {lb_user.lb_departements
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
