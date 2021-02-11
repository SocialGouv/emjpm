import { MailOutline } from "@styled-icons/material/MailOutline";
import { Smartphone } from "@styled-icons/material/Smartphone";
import { Box, Flex, Text } from "rebass";

import useUser from "~/hooks/useUser";
import { Card, Heading } from "~/components";

import { boxStyle, iconTextStyle, innerTextStyle } from "./style";

function MagistratTribunalInformations(props) {
  const {
    magistrat: { ti },
  } = useUser();
  return (
    <Box {...props}>
      <Card p="5">
        <Heading size={3}>{ti.etablissement}</Heading>
        <Box sx={boxStyle}>
          <Text sx={innerTextStyle}>
            {ti.code_postal} {ti.ville}
          </Text>
          <Text sx={innerTextStyle}>
            {ti.siret ? `Siret: ${ti.siret}` : ""}
          </Text>
          <Flex mt="3">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>
              {ti.email.length > 1 ? ti.email : ""}
            </Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>
              {ti.telephone.length > 1 ? ti.telephone : ""}
            </Text>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
}

export { MagistratTribunalInformations };
