import { Box } from "rebass";

import Card from "../Card";
import Heading from "../Heading";
import Spinner from "../Spinner";
import { IndicatorTextStyle } from "./style";

function Indicator(props) {
  const { error, loading, title, headingSize, data, load } = props;

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

  const indicator = load ? load(data) : props.indicator;

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

export default Indicator;
