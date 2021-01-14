import PropTypes from "prop-types";

import { Box } from "rebass";

import { fieldStyle } from "./style";

function Field(props) {
  const { children, ...parentProps } = props;

  return (
    <Box sx={fieldStyle} {...parentProps}>
      {children}
    </Box>
  );
}

Field.propTypes = {
  children: PropTypes.node.isRequired,
};

Field.propTypes = {};

Field.defaultProps = {};

export { Field };
