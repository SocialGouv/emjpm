import { Building } from "@styled-icons/fa-regular/Building";
import { MailOutline } from "@styled-icons/material/MailOutline";
import { PersonOutline } from "@styled-icons/material/PersonOutline";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { UserContext } from "~/containers/UserContext";
import { Card, Heading } from "~/components";

import { boxStyle, flexStyle, iconTextStyle } from "./style";

function AdminInformations(props) {
  const { email, nom, prenom } = useContext(UserContext);
  return (
    <Box {...props}>
      <Card p="5">
        <Heading size={3}>
          {nom ? nom : ""} {prenom ? prenom : ""}
        </Heading>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading size={5}>Vos informations</Heading>
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
            <LinkButton to="/admin/edit-informations">
              Modifier vos informations
            </LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton to="/admin/edit-password">
            Modifier votre mot de passe
          </LinkButton>
        </Flex>
      </Card>
    </Box>
  );
}

export { AdminInformations };
