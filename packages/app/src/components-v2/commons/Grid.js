import React from "react";
import { Flex, Box } from "rebass";

const wrapperStyle = {
  maxWidth: "1200px",
  margin: "0 auto"
};

const FlexWrapper = props => {
  const { children } = props;
  return (
    <Flex sx={wrapperStyle} {...props}>
      {children}
    </Flex>
  );
};

const BoxWrapper = props => {
  const { children } = props;
  return (
    <Box sx={wrapperStyle} {...props}>
      {children}
    </Box>
  );
};

const fourColumnStyle = {
  m: 1,
  width: ["100%", "calc(50% - 20px)", "calc(25% - 20px)"]
};

const twoColumnStyle = {
  m: 1,
  width: ["100%", "calc(50% - 20px)"]
};

export { BoxWrapper, FlexWrapper, fourColumnStyle, twoColumnStyle };
