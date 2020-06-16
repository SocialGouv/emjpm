import React from "react";
import { Box, Flex } from "rebass";

import Link from "./Link";

export const Navigation = (props) => {
  const { links } = props;

  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links.map(({ title, url, as }) => (
          <Box key={title} px={1}>
            <Link href={url} as={as}>
              {title}
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
