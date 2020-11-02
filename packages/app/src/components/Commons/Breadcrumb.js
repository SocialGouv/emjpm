import { Text } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { Link } from "./Link";

export const Breadcrumb = ({ crumbs }) => {
  return (
    <Flex>
      {crumbs.map(({ label, href, as }, i) => (
        <Fragment key={`${i}`}>
          {i !== 0 && (
            <Box mx={10} color="#999">
              &gt;
            </Box>
          )}
          {href ? (
            <Link href={href} asLink={as}>
              {label}
            </Link>
          ) : (
            <Text>{label}</Text>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};
