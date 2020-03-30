import React, { useState } from 'react';
import { Box } from 'rebass';

import { Textarea } from '.';

export default {
  component: Textarea,
  title: 'Core | Textarea',
};

export const TextareaStory = () => {
  const [value, setValue] = useState(null);

  const handleChange =  event => {
    setValue(event.target.value);
  };

  return (
    <Box p={4} bg="white">
      <Textarea
        id="test"
        value={value}
        label="Informations"
        onChange={handleChange}
        placeholder="Préférences géographiques, compétences, ..."
      />
    </Box>
  );
};

export const TextareaErrorStory = () => {
  const error = "Field is required";
  const [value, setValue] = useState(null);

  const handleChange =  event => {
    setValue(event.target.value);
  };

  return (
    <Box p={4} bg="white">
      <Textarea
        error={error}
        id="test"
        label="Informations"
        onChange={handleChange}
        placeholder="Préférences géographiques, compétences, ..."
        value={value || ""}
      />
    </Box>
  );
};
