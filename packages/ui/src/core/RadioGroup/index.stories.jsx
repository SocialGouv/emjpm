import React, { Fragment } from 'react';

import { RadioGroup } from '.';

export default {
  component: RadioGroup,
  title: 'Core |RadioGroup',
};

const options = [
  { label: 'Red', name: 'color', value: 'red' },
  { label: 'Blue', name: 'color', value: 'blue' },
  { label: 'Yellow', name: 'color', value: 'yellow' },
  { label: 'Green', name: 'color', value: 'green' },
  { label: 'Black', name: 'color', value: 'black' },
];

export const TextStory = () => {
  return (
    <Fragment>
      <RadioGroup
        defaultValue={options[2].value}
        onChange={(currentValue) => console.log(currentValue)}
        options={options}
      />
    </Fragment>
  );
};
