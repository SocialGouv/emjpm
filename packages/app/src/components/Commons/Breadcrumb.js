import { Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

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
            <Link href={href} as={as}>
              <a>
                <Text color="primary">{label}</Text>
              </a>
            </Link>
          ) : (
            <Text>{label}</Text>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};
