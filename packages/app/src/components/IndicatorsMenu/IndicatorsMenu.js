import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
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
    <Box {...props}>
      <Card p="3" mb="3" sx={{ borderRadius: "15px" }}>
        <Link href={`/indicateurs`}>
          <StyledLink sx={linkStyle}>France entière</StyledLink>
        </Link>
      </Card>
      {departements.map((departement, index) => {
        return (
          <Card key={`${index}-${departement.code}`} p="3" mb="3" sx={{ borderRadius: "15px" }}>
            <Link href={`/indicateurs/${departement.code}`}>
              <StyledLink sx={linkStyle}>{departement.nom}</StyledLink>
            </Link>
          </Card>
        );
      })}
    </Box>
  );
};

export { IndicatorsMenu };
