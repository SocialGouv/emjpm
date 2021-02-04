import PropTypes from "prop-types";

import { Box } from "rebass";

import { wrapperStyle } from "../style";

function BoxWrapper(props) {
  const { children } = props;
  return (
    <Box sx={wrapperStyle} {...props}>
      {children}
    </Box>
  );
}

BoxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoxWrapper;
