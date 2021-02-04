import { Scrollbar } from "react-scrollbars-custom";
import { Box, Link as StyledLink } from "rebass";

import { Link } from "~/containers/Link";
import { Card, Heading, Spinner } from "~/components";
import { departementList } from "~/utils/geodata";

const linkStyle = {
  color: "black",
  display: "block",
  fontFamily: "heading",
  fontSize: "2",
  fontWeight: "bold",
  mb: "0",
};

function IndicatorsMenu(props) {
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
        {departementList.map(({ code, nom }) => {
          return (
            <Card key={code} p="1" mb="1" sx={{ borderRadius: "15px" }}>
              <Link
                to={`/stats/${code}`}
                component={(props) => (
                  <StyledLink
                    onClick={() => props.navigate(props.href)}
                    sx={linkStyle}
                  >{`${code} - ${nom}`}</StyledLink>
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
