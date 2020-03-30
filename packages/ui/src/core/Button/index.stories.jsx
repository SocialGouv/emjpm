import React from 'react';

import { Button } from '.';

export default {
  component: Button,
  title: 'Core | Button',
};

export const normal = () => <Button>Ajouter une mesure</Button>;

export const outline = () => <Button variant="outline">outline button</Button>;

export const loading = () => <Button isLoading>loading button</Button>;

normal.story = {
  name: 'button',
};
