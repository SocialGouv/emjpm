import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Link as StyledLink } from "rebass";

import { Link } from "~/components/Link";
import { Card, Heading4, Spinner } from "~/ui";

import { INDICATORS } from "./queries";

const linkStyle = {
  color: "black",
  display: "block",
  fontFamily: "heading",
  fontSize: "2",
  fontWeight: "bold",
  mb: "0",
};

const IndicatorsMenu = (props) => {
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
            <Card
              key={`${index}-${departement.code}`}
              p="1"
              mb="1"
              sx={{ borderRadius: "15px" }}
            >
              <Link
                prefetch={false}
                href={`/stats/[departement_code]`}
                as={`/stats/${departement.code}`}
              >
                <StyledLink
                  sx={linkStyle}
                >{`${departement.code} - ${departement.nom}`}</StyledLink>
              </Link>
            </Card>
          );
        })}
      </Box>
    </Scrollbar>
  );
};

export { IndicatorsMenu };
