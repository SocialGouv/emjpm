import React from 'react';

import { BoxWrapper } from '../../core/Grid';
import { Mandatairelist } from '.';
import { MandataireContextProvider } from './context';
import { ChooseComponent } from './stories/components';

export default {
  component: Mandatairelist,
  title: 'Components | Mandatairelist',
};

const datas = [
  {
    adresse: 'test',
    codePostal: '75017',
    currentAvailability: 50,
    cvLink: 'http://google.fr',
    dispoMax: 150,
    email: 'sarah@connor.cdom',
    genre: 'H',
    id: '123',
    isAvailable: true,
    lastLogin: '2018-04-18T11:15:06.077029+00:00',
    lastLoginIsCritical: false,
    latitude: 23.33332,
    longitude: 2.33332,
    mandataireId: 123,
    mesuresAwaiting: 2,
    mesuresInProgress: 2,
    nom: 'Sarahzzzzsrtzrrg',
    prenom: 'Connor',
    serviceId: 134,
    telephone: '0683961487',
    type: 'individuel',
    ville: 'Paris',
  },
  {
    adresse: 'test',
    codePostal: '75017',
    currentAvailability: 20,
    cvLink: 'http://google.fr',
    dispoMax: 150,
    email: 'johnhezfzfzefzfnry@skynet.com',
    genre: 'H',
    id: '1234',
    isAvailable: true,
    lastLogin: '2018-04-18T11:15:06.077029+00:00',
    lastLoginIsCritical: true,
    latitude: 23.33332,
    longitude: 2.33332,
    mandataireId: 123,
    mesuresAwaiting: 20,
    mesuresInProgress: 2,
    nom: 'John',
    prenom: 'henry',
    serviceId: 134,
    telephone: '0683961487zfzefzef',
    type: 'préposé',
    ville: 'Lions sur mer eeeeeeeeee',
  },
  {
    adresse: 'test',
    codePostal: '75017',
    currentAvailability: 0,
    cvLink: 'http://google.fr',
    dispoMax: 150,
    email: 'johnhezfzfzefzfnry@skynet.com',
    etablissement: 'henry',
    genre: 'H',
    id: '12345',
    isAvailable: true,
    lastLogin: '2018-04-18T11:15:06.077029+00:00',
    lastLoginIsCritical: true,
    latitude: 23.33332,
    longitude: 2.33332,
    mandataireId: 123,
    mesuresAwaiting: 20,
    mesuresInProgress: 150,
    nom: 'John',
    prenom: 'henry',
    serviceId: 134,
    telephone: '0683961487zfzefzef',
    type: 'service',
    ville: 'Lions sur mer eeeeeeeeee',
  },
];

export const MandatairelistStory = () => (
  <BoxWrapper mt="5">
    <Mandatairelist mandataires={datas} />
  </BoxWrapper>
);

export const MandataireMagristratlistStory = () => (
  <MandataireContextProvider>
    <BoxWrapper mt="5">
      <Mandatairelist ChooseComponent={ChooseComponent} isMagistrat mandataires={datas} />
    </BoxWrapper>
  </MandataireContextProvider>
);

export const MandataireMagristratMaplistStory = () => (
  <MandataireContextProvider>
    <BoxWrapper mt="5">
      <Mandatairelist
        selectCurrentMandataire={(data) => console.log(data)}
        ChooseComponent={ChooseComponent}
        isMagistratMap
        mandataires={datas}
      />
    </BoxWrapper>
  </MandataireContextProvider>
);
