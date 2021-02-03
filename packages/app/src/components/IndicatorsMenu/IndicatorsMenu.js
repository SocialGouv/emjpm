import { useQuery } from "@apollo/client";

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

function IndicatorsMenu(props) {
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
          <Link
            to={"/stats"}
            component={(props) => (
              <StyledLink
                onClick={() => props.navigate(props.href)}
                sx={linkStyle}
              >
                France entière
              </StyledLink>
            )}
          />
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
                to={`/stats/${departement.code}`}
                component={(props) => (
                  <StyledLink
                    onClick={() => props.navigate(props.href)}
                    sx={linkStyle}
                  >{`${departement.code} - ${departement.nom}`}</StyledLink>
                )}
              />
            </Card>
          );
        })}
      </Box>
    </Scrollbar>
  );
}

export { IndicatorsMenu };
