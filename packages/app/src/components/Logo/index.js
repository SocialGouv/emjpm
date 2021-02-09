import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";
import Marianne from "./Marianne";
import { LogoStyle, logoTextStyle } from "./style";

import { Link } from "~/components/Link";

function Logo(props) {
  const { hasTitle, title } = props;

  return (
    <Flex>
      <Link
        to="/"
        component={({ navigate, to }) => (
          <>
            <Box sx={LogoStyle} onClick={() => navigate(to)}>
              <Marianne />
            </Box>
            {hasTitle && (
              <Box onClick={() => navigate(to)}>
                <Text sx={logoTextStyle}>{title}</Text>
              </Box>
            )}
          </>
        )}
      />
    </Flex>
  );
}

Logo.propTypes = {
  hasTitle: PropTypes.bool,
  title: PropTypes.string,
};

Logo.defaultProps = {
  hasTitle: true,
  title: "e-MJPM",
};

export default Logo;
