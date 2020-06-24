import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';

import { Card, Heading0, Heading4, Spinner } from '../../core';
import { IndicatorTextStyle } from './style';

const Indicator = (props) => {
  const { error, loading, indicator, title } = props;
  if (error) {
    return (
      <Card height="100%">
        <Heading4>{title}</Heading4>
        <Heading4 color="error" mt="3">
          aucune donnée disponible
        </Heading4>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card height="100%">
        <Heading4>{title}</Heading4>
        <Box mt="3">
          <Spinner />
        </Box>
      </Card>
    );
  }

  return (
    <Card justifyContent="space-between" flexDirection="column" display="flex" height="100%">
      <Heading4>{title}</Heading4>
      <Heading0 sx={IndicatorTextStyle(indicator < 0)}>{indicator}</Heading0>
    </Card>
  );
};

Indicator.defaultProps = {
  error: false,
  loading: false,
};

Indicator.propTypes = {
  error: PropTypes.bool,
  indicator: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export { Indicator };
