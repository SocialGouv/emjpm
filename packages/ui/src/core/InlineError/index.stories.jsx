import React from 'react';
import { Box } from 'rebass';

import { InlineError } from '.';

export default {
  component: InlineError,
  title: 'Core | InlineError',
};

export const InlineErrorStory = () => (
  <Box mb={2}>
    <InlineError message="Field is required" fieldId="" />
  </Box>
);

export const InlineErrorEmptyStory = () => (
  <Box mb={2}>
    <InlineError message={undefined} fieldId="" />
  </Box>
);
