import PropTypes from "prop-types";

import { Box } from "rebass";

import { wrapperStyle } from "../style";

function BoxWrapper({ children, sx = {}, ...props }) {
  return (
    <Box sx={{ ...wrapperStyle, ...sx }} {...props}>
      {children}
    </Box>
  );
}

BoxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoxWrapper;
