import { Card, Heading4, Text } from '@socialgouv/emjpm-ui-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Box, Flex } from 'rebass';

import {
  antenneTitleStyle,
  availabilityIndicatorStyle,
  mesureStyle,
  numberContainer,
  numberStyle,
  preferenceText,
  subtitle,
} from './style';

const Antenne = (props) => {
  const { Link, linkText, href, sx, antenne, hasButton } = props;
  return (
    <Card sx={sx}>
      <Heading4 sx={antenneTitleStyle}>{antenne.name}</Heading4>
      <Flex sx={{ alignItems: 'center', mb: '3' }}>
        <Box sx={availabilityIndicatorStyle(antenne.mesures_max <= antenne.mesures_in_progress)} />
        <Text sx={{ color: 'black', fontSize: '1', fontWeight: 'semibold' }}>
          {antenne.mesures_max <= antenne.mesures_in_progress ? 'non disponible' : 'disponible'}
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
      <Text sx={subtitle}>Préférences géographiques</Text>
      {antenne.preferences.length > 0 ? (
        <Fragment>
          {antenne.preferences.map((preference) => {
            return <Text sx={preferenceText}>{preference}</Text>;
          })}
        </Fragment>
      ) : (
        <Text sx={preferenceText}>Non renseigné</Text>
      )}
      {hasButton && (
        <Box mt="3">
          <Link href={href}>{linkText}</Link>
        </Box>
      )}
    </Card>
  );
};

Antenne.defaultProps = {
  Link: null,
  hasButton: true,
  href: null,
  linkText: null,
  sx: null,
};

Antenne.propTypes = {
  Link: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  antenne: PropTypes.shape({
    mesures_in_progress: PropTypes.number.isRequired,
    mesures_max: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preferences: PropTypes.array,
  }).isRequired,
  hasButton: PropTypes.bool,
  href: PropTypes.string,
  linkText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

export { Antenne };
