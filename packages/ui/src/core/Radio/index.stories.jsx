import React, { Fragment } from 'react';

import { Radio } from '.';

export default {
  component: Radio,
  title: 'Core |Radio',
};

export const TextStory = () => {
  return (
    <Fragment>
      <Radio label="label" checked={false} id="radio1" name="test" />
    </Fragment>
  );
};
