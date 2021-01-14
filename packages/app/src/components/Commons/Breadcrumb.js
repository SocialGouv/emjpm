import { Fragment } from "react";
import { Box, Flex } from "rebass";

import { Text } from "~/ui";

import { Link } from "./Link";

export function Breadcrumb({ crumbs }) {
  return (
    <Flex>
      {crumbs.map(({ label, to }, i) => (
        <Fragment key={`${i}`}>
          {i !== 0 && (
            <Box mx={10} color="#999">
              &gt;
            </Box>
          )}
          {to ? <Link to={to}>{label}</Link> : <Text>{label}</Text>}
        </Fragment>
      ))}
    </Flex>
  );
}
