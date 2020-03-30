import React from 'react';

import { Card } from '.';

export default {
  component: Card,
  title: 'Core |Card',
};

export const normal = () => <Card>Ajouter une mesure</Card>;

export const popCard = () => <Card variant="popCard">Ajouter une mesure</Card>;

export const sideCard = () => <Card variant="sideCard">Ajouter une mesure</Card>;

normal.story = {
  name: 'Card',
};

popCard.story = {
  name: 'Card Pop',
};

sideCard.story = {
  name: 'Card Side',
};
