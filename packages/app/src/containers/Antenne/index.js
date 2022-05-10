import PropTypes from "prop-types";

import { Box, Flex } from "rebass";

import { Card, Heading, Text } from "~/components";
import {
  antenneTitleStyle,
  availabilityIndicatorStyle,
  mesureStyle,
  numberContainer,
  numberStyle,
} from "./style";

export default function Antenne(props) {
  const { Link, linkText, to, sx, antenne, hasButton } = props;
  return (
    <Card sx={sx}>
      <Heading size={4} sx={antenneTitleStyle}>
        {antenne.name}
      </Heading>
      <Flex sx={{ alignItems: "center", mb: "3" }}>
        <Box
          sx={availabilityIndicatorStyle(
            antenne.mesures_max <= antenne.mesures_in_progress
          )}
        />

        <Text sx={{ color: "black", fontSize: "1", fontWeight: "semibold" }}>
          {antenne.mesures_max <= antenne.mesures_in_progress
            ? "non disponible"
            : "disponible"}
        </Text>
      </Flex>
      <Flex sx={numberContainer}>
        <Text sx={numberStyle}>{antenne.mesures_max}</Text>
        <Text sx={mesureStyle}>mesures souhaitées</Text>
      </Flex>
      <Flex sx={numberContainer}>
        <Text sx={numberStyle}>{antenne.mesures_in_progress}</Text>
        <Text sx={mesureStyle}>mesures en cours</Text>
      </Flex>
      <Flex sx={numberContainer}>
        <Text sx={numberStyle}>{antenne.mesures_awaiting}</Text>
        <Text sx={mesureStyle}>mesures en attente</Text>
      </Flex>
      {hasButton && (
        <Box mt="3">
          <Link to={to}>{linkText}</Link>
        </Box>
      )}
    </Card>
  );
}

Antenne.defaultProps = {
  Link: null,
  hasButton: true,
  linkText: null,
  sx: null,
  to: null,
};

Antenne.propTypes = {
  Link: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  antenne: PropTypes.shape({
    mesures_in_progress: PropTypes.number.isRequired,
    mesures_max: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preferences: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  hasButton: PropTypes.bool,
  linkText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,

  to: PropTypes.string,
};
