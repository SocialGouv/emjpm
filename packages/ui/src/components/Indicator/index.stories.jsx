import React from 'react';
import { Box } from 'rebass';

import { Indicator } from '.';

export default {
  component: Indicator,
  title: 'Components | Indicator',
};

export const IndicatorStory = () => (
  <Indicator error={false} loading={false} indicator={4285} title="indicator title" />
);

export const IndicatorNegativeStory = () => (
  <Indicator error={false} loading={false} indicator={-50} title="indicator title" />
);

export const LoadingIndicator = () => (
  <Indicator error={false} loading indicator={100} title="indicator title" />
);


export const IndicatorsWithMultipleLines = () => (
  <Box
    sx={{
      display: 'grid',
      gridGap: 2,
      gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)'],
    }}
  >
    <Indicator error={false} loading={false} indicator={10} title="indicator title" />
    <Indicator error={false} loading={false} indicator={10} title="______________1 ______________2 ______________3 ______________4 ______________5 ______________6" />
  </Box>
);
