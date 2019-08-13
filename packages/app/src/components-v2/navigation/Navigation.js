import React from "react";
import { Flex, Box } from "rebass";
import Link from "./Link";

const links = [
  {
    title: "mesures",
    url: "/direction"
  },
  {
    title: "mandataires",
    url: "/mandataires"
  }
];

export const Navigation = () => {
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
