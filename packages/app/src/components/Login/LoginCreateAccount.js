import styled from "@emotion/styled";
import React from "react";
import { Flex, Text } from "rebass";

import { LinkButton } from "../Commons";

const LineBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-align: center;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    height: 12px;
    border-bottom: 1px solid #cfcfcf;
    top: 0;
    width: 100%;
  }
`;

const LoginCreateAccount = () => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        mt: "6"
      }}
    >
      <LineBox>
        <Text
          sx={{
            bg: "#f2f5f9",
            color: "#404040",
            fontSize: 2,
            fontWeight: "bold",
            mb: "6",
            position: "relative",
            px: "2",
            textAlign: "center",
            width: "50px"
          }}
        >
          OU
        </Text>
      </LineBox>
      <LinkButton px="5" py="3" href="/signup">
        Créer votre compte emjpm
      </LinkButton>
    </Flex>
  );
};

export { LoginCreateAccount };
