import React from 'react';
import { Link } from 'rebass';

import { DropDownMenu } from '.';

export default {
  component: DropDownMenu,
  title: 'Components | DropDownMenu',
};

const dropDownLinks = [
  { title: "Centre d'assistance", url: 'test' },
  { title: 'Profil', url: 'test' },
  { title: 'Paramètres', url: 'test' },
];

export const DropDownMenuStory = () => (
  <DropDownMenu
    disconnect={() => {
      console.log('disconnect');
    }}
    Link={Link}
    dropDownLinks={dropDownLinks}
  />
);
