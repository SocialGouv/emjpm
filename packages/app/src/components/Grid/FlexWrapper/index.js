import PropTypes from "prop-types";

import { Flex } from "rebass";

import { wrapperStyle } from "../style";

function FlexWrapper(props) {
  const { children } = props;
  return (
    <Flex sx={wrapperStyle} {...props}>
      {children}
    </Flex>
  );
}

FlexWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexWrapper;
