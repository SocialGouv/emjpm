import React, { useState } from 'react';
import { Box } from "rebass";

import { AsyncSelect, Select } from '.';

export default {
  component: Select,
  title: 'Core | Select',
};

const options = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

export const SelectStory = () => {
  const [selectedValue, changeValue] = useState(false);
  return <Select options={options} value={selectedValue} onChange={(selectedOption) => changeValue(selectedOption)} />;
};

export const SelectLargeStory = () => {
  const [selectedValue, changeValue] = useState(false);
  return (
    <Select
      options={options}
      size="large"
      value={selectedValue}
      onChange={(selectedOption) => changeValue(selectedOption)}
    />
  );
};

export const SelectSmallStory = () => {
  const [selectedValue, changeValue] = useState(false);
  return (
    <Select
      options={options}
      size="small"
      value={selectedValue}
      onChange={(selectedOption) => changeValue(selectedOption)}
    />
  );
};

export const SelectAsync = () => {
  const promiseOptions = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(options), 1000);
    });

  return (
    <Box my={20}>
      <AsyncSelect
        loadOptions={promiseOptions}
        cacheOptions
        placeholder="Ville, code postal, ..."
        noOptionsMessage={() => "Pas de résultats"}
        isClearable
 />
    </Box>
  );
};
