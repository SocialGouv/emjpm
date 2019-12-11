import PropTypes from "prop-types";
import React from "react";
import { Box } from "rebass";

import { resultStyle } from "./style";

const GeocodeResults = props => {
  const { results, onSelect } = props;

  return results.map(result => (
    <Box
      key={`${result.city}-${result.postcode}`}
      onClick={() => onSelect(result)}
      sx={resultStyle}
    >
      {result.city}, {result.postcode}
    </Box>
  ));
};

GeocodeResults.defaultProps = {
  results: []
};

GeocodeResults.propTypes = {
  results: PropTypes.array
};

export { GeocodeResults };
