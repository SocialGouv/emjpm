import { directionFormatter } from "@emjpm/biz";
import { Building } from "@styled-icons/fa-regular/Building";
import { MailOutline } from "@styled-icons/material/MailOutline";
import { PersonOutline } from "@styled-icons/material/PersonOutline";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Card, Heading } from "~/components";

import { boxStyle, flexStyle, iconTextStyle } from "./style";

function DirectionInformations(props) {
  const { email, nom, prenom, directions } = useUser();
  return (
    <Box {...props} id="informations_generales" tabIndex="-1">
      <Card p="5">
        <Heading size={3}>
          {nom ? nom : ""} {prenom ? prenom : ""}
        </Heading>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading size={5}>Vos informations</Heading>
            <Flex mt="2">
              <Building size="16" />
              <Text sx={iconTextStyle}>
                {directionFormatter.formatAdministrationInfo(directions[0])}
              </Text>
            </Flex>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Flex mt="2">
              <PersonOutline size="20" />
              <Text sx={iconTextStyle}>
                {`${prenom ? prenom : ""} ${nom ? nom : ""} `}{" "}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton
              to="/direction/edit-informations"
              title="Modifier vos informations"
              aria-label="Modifier vos informations"
            >
              Modifier vos informations
            </LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton
            to="/direction/edit-password"
            title="Modifier votre mot de passe"
            aria-label="Modifier votre mot de passe"
          >
            Modifier votre mot de passe
          </LinkButton>
        </Flex>
      </Card>
    </Box>
  );
}

export { DirectionInformations };
