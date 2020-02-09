import React from "react";
import { Box, Flex } from "rebass";

import Link from "./Link";

export const Navigation = props => {
  const { links } = props;

  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links
          .filter(({ disabled }) => !disabled)
          .map(({ title, url }) => (
            <Box key={title} px={1}>
              <Link href={url}>{title}</Link>
            </Box>
          ))}
      </Flex>
    </Box>
  );
};
