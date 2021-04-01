import PropTypes from "prop-types";

import { Box } from "rebass";

import Card from "../Card";
import Heading from "../Heading";
import Spinner from "../Spinner";
import { IndicatorTextStyle } from "./style";

function Indicator(props) {
  const { error, loading, indicator, title, headingSize } = props;
  if (error) {
    return (
      <Card height="100%">
        <Heading size={headingSize}>{title}</Heading>
        <Heading size={headingSize} color="error" mt="3">
          aucune donnée disponible
        </Heading>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card height="100%">
        <Heading size={headingSize}>{title}</Heading>
        <Box mt="3">
          <Spinner />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      justifyContent="space-between"
      flexDirection="column"
      display="flex"
      height="100%"
    >
      <Heading size={headingSize}>{title}</Heading>
      <Heading size={0} sx={IndicatorTextStyle(indicator < 0)}>
        {indicator}
      </Heading>
    </Card>
  );
}

Indicator.defaultProps = {
  error: false,
  loading: false,
  headingSize: 4,
};

Indicator.propTypes = {
  error: PropTypes.bool,
  indicator: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  headingSize: PropTypes.number,
};

export default Indicator;
