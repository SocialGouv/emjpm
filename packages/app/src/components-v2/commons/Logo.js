import React from "react";
import { Image, Box, Text, Flex } from "rebass";

const LogoStyle = {
  width: ["77px"]
};

const logoTextStyle = {
  fontFamily: "heading",
  fontSize: 4,
  lineHeight: "46px",
  ml: 1
};

const Logo = props => {
  const { hasTitle } = props;
  return (
    <Flex>
      <Box>
        <Image src={"/static/images/marianne.svg"} sx={LogoStyle} />
      </Box>
      {hasTitle && (
        <Box>
          <Text sx={logoTextStyle}>
            empjm.
            <b>beta.gouv</b>
            .fr
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export { Logo };
