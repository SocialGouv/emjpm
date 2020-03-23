import React from 'react';

import { BoxWrapper } from '../../../core/src/Grid';
import { MesureList } from '.';
import { MesureContextProvider } from './context';
import {
  AcceptComponent,
  CloseComponent,
  EditComponent,
  Link,
  ReactivateComponent,
  RemoveComponent,
} from './stories/components';
import { datas, mandataireDatas } from './stories/data';

export default {
  component: MesureList,
  title: 'Components | MesureList',
};

export const MesureListStory = () => (
  <MesureContextProvider>
    <BoxWrapper mt="5">
      <MesureList
        EditComponent={EditComponent}
        RemoveComponent={RemoveComponent}
        AcceptComponent={AcceptComponent}
        CloseComponent={CloseComponent}
        ReactivateComponent={ReactivateComponent}
        LinkComponent={(props) => <Link {...props} />}
        onPanelOpen={(id) => console.log(`onPanelOpen with ${id}`)}
        mesures={datas}
      />
    </BoxWrapper>
  </MesureContextProvider>
);

export const magistratMesureListStory = () => (
  <MesureContextProvider>
    <BoxWrapper mt="5">
      <MesureList
        isMagistrat
        EditComponent={EditComponent}
        RemoveComponent={RemoveComponent}
        LinkComponent={(props) => <Link {...props} />}
        onPanelOpen={(id) => console.log(`onPanelOpen with ${id}`)}
        mesures={mandataireDatas}
      />
    </BoxWrapper>
  </MesureContextProvider>
);
