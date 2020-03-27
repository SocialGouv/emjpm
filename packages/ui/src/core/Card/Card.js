import React from 'react';
import { Card as RebassCard } from 'rebass';

const Card = (props) => (
  <RebassCard
    sx={{
      px: 3,
      py: 2,
    }}
    {...props}
  />
);

export { Card };
