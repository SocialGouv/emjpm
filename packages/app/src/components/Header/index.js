import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import { LogoEtat, LoggedMenu } from "~/components";
import { useCallback } from "react";
import { BoxWrapper } from "~/components/Grid";

function Header(props) {
  const { dropDownLinks, isPublicLayout } = props;

  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <BoxWrapper>
      <Flex
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-between"
        height="115px"
      >
        <Box p={1}>
          <Flex flexWrap="wrap" justifyContent="left">
            <Box>
              <LogoEtat />
            </Box>
            <Box ml={2}>
              <button onClick={goToHome} style={{ paddingTop: "24px" }}>
                <Text
                  color="#007AD9"
                  fontWeight="100"
                  fontSize="5"
                  style={{ display: "inline" }}
                >
                  e
                </Text>
                <Text
                  color="#404040"
                  fontWeight="100"
                  fontSize="5"
                  style={{ display: "inline" }}
                >
                  MJPM
                </Text>
              </button>
            </Box>
          </Flex>
        </Box>

        {!isPublicLayout && <LoggedMenu dropDownLinks={dropDownLinks} />}
      </Flex>
    </BoxWrapper>
  );
}

export default Header;
