import React from "react";
import { Box, Flex } from "rebass";

import Link from "./Link";

export const Navigation = props => {
  const { links } = props;
  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links.map(link => {
          const { title, url } = link;
          return (
            <Box key={title} px={1}>
              <Link href={url}>{title}</Link>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
