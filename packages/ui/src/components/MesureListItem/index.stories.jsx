import { action } from '@storybook/addon-actions';
import React from 'react';
import { Box } from 'rebass';

import { MesureListItem } from '.';

export default {
  component: MesureListItem,
  title: 'Components | MesureListItem',
};

const dataProgress = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: false,
  judgmentDate: '',
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: 'RG-00000000',
  lieu_vie: 'domicile',
  status: 'Mesure en cours',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

const dataWaiting = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: false,
  judgmentDate: '',
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: 'RG-00000000',
  lieu_vie: 'domicile',
  status: 'Mesure en attente',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

const dataWaitingUrgent = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: true,
  judgmentDate: '13/06/2019',
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: '19/00519',
  lieu_vie: 'domicile',
  status: 'Mesure en attente',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

const dataClose = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: false,
  judgmentDate: '',
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: '19/00519',
  lieu_vie: 'domicile',
  status: 'Mesure éteinte',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

const dataMagistratUrgent = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: true,
  judgmentDate: '13/06/2019',
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: '19/00519',
  lieu_vie: 'domicile',
  status: 'Mesure en attente',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

const dataMagistrat = {
  age: '1957',
  antenneId: null,
  cabinet: null,
  civilite: 'monsieur',
  codePostal: '06000',
  dateNomination: '2019-06-13',
  dateNominationFormated: '13/06/2019',
  href: '/services/mesure/59185/',
  id: 59185,
  isUrgent: false,
  judgmentDate: null,
  latitude: 43.712,
  longitude: 7.23827,
  numeroDossier: 'AMBLPIE',
  numeroRg: '19/00519',
  lieu_vie: 'domicile',
  status: 'Mesure en attente',
  tiId: null,
  tribunal: '',
  natureMesure: 'sauvegarde_justice',
  ville: 'NICE',
};

export const MesureListItemStoryProgress = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} mesure={dataProgress} />
  </Box>
);

export const MesureListItemStoryWaiting = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} mesure={dataWaiting} />
  </Box>
);

export const MesureListItemStoryWaitingUrgent = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} mesure={dataWaitingUrgent} />
  </Box>
);

export const MesureListItemStoryClose = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} mesure={dataClose} />
  </Box>
);

export const MesureListItemMagistratStoryUrgent = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} isMagistrat mesure={dataMagistratUrgent} />
  </Box>
);

export const MesureListItemMagistratStory = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} isMagistrat mesure={dataMagistrat} />
  </Box>
);

export const MesureListItemMagistratStoryAll = () => (
  <Box p="4" maxWidth="1140px">
    <MesureListItem onClick={action('button-click')} isMagistrat mesure={dataMagistrat} />
    <MesureListItem onClick={action('button-click')} mesure={dataClose} />
    <MesureListItem onClick={action('button-click')} mesure={dataProgress} />
    <MesureListItem onClick={action('button-click')} mesure={dataWaiting} />
    <MesureListItem onClick={action('button-click')} mesure={dataWaitingUrgent} />
    <MesureListItem onClick={action('button-click')} isMagistrat mesure={dataMagistratUrgent} />
  </Box>
);

export const MesureListItemMagistratStoryAllSmall = () => (
  <Box p="4" maxWidth="550px">
    <MesureListItem
      hasLocation={false}
      hasTribunal={false}
      hasFolderNumber={false}
      onClick={action('button-click')}
      mesure={dataProgress}
    />
  </Box>
);
