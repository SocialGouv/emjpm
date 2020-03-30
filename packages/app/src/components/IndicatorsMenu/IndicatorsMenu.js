import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Link as StyledLink } from "rebass";

import { INDICATORS } from "./queries";

const linkStyle = {
  fontWeight: "bold",
  fontSize: "2",
  color: "black",
  mb: "0",
  fontFamily: "heading",
  display: "block"
};

const IndicatorsMenu = props => {
  const { data, error, loading } = useQuery(INDICATORS);

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { departements } = data;
  return (
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <Box {...props} mr="1">
        <Card p="1" mb="1" sx={{ borderRadius: "15px" }}>
          <Link prefetch={false} href={`/stats`}>
            <StyledLink sx={linkStyle}>France entière</StyledLink>
          </Link>
        </Card>
        {departements.map((departement, index) => {
          return (
            <Card key={`${index}-${departement.code}`} p="1" mb="1" sx={{ borderRadius: "15px" }}>
              <Link
                prefetch={false}
                href={`/stats/[departement_code]`}
                as={`/stats/${departement.code}`}
              >
                <StyledLink sx={linkStyle}>{`${departement.code} - ${departement.nom}`}</StyledLink>
              </Link>
            </Card>
          );
        })}
      </Box>
    </Scrollbar>
  );
};

export { IndicatorsMenu };
