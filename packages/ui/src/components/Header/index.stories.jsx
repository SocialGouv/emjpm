import React from 'react';
import { Link } from 'rebass';

import { DropDownMenu } from '../DropDownMenu';
import { Header } from '.';

export default {
  component: Header,
  title: 'Components | Header',
};

const dropDownLinks = [
  { title: "Centre d'assistance", url: 'test' },
  { title: 'Profil', url: 'test' },
  { title: 'Paramètres', url: 'test' },
];

export const HeaderStory = () => (
  <Header
    Link={Link}
    dropDownLinks={dropDownLinks}
    disconnect={() => {
      console.log('disconnect');
    }}
    DropDownMenu={DropDownMenu}
    username="test"
  />
);

export const HeaderIsDisconnectedStory = () => (
  <Header
    Link={Link}
    isDisconnected
    dropDownLinks={dropDownLinks}
    disconnect={() => {
      console.log('disconnect');
    }}
    DropDownMenu={DropDownMenu}
    username="test"
  />
);
