import PropTypes from 'prop-types';
import React from 'react';

import { PANEL_TYPE } from './constants/type';

const MesurePanel = (props) => {
  const {
    currentPanelType,
    currentMesure,
    AcceptComponent,
    EditComponent,
    RemoveComponent,
    CloseComponent,
    ReactivateComponent,
  } = props;

  switch (currentPanelType) {
    case PANEL_TYPE.ACCEPT: {
      return <AcceptComponent currentMesure={currentMesure} />;
    }
    case PANEL_TYPE.CLOSE: {
      return <CloseComponent currentMesure={currentMesure} />;
    }
    case PANEL_TYPE.EDIT: {
      return <EditComponent currentMesure={currentMesure} />;
    }
    case PANEL_TYPE.REACTIVATE: {
      return <ReactivateComponent currentMesure={currentMesure} />;
    }
    case PANEL_TYPE.REMOVE: {
      return <RemoveComponent currentMesure={currentMesure} />;
    }
    default: {
      return null;
    }
  }
};

MesurePanel.defaultProps = {
  AcceptComponent: null,
  CloseComponent: null,
  EditComponent: null,
  ReactivateComponent: null,
  RemoveComponent: null,
  currentMesure: null,
  currentPanelType: null,
};

MesurePanel.propTypes = {
  AcceptComponent: PropTypes.elementType,
  CloseComponent: PropTypes.elementType,
  EditComponent: PropTypes.elementType,
  ReactivateComponent: PropTypes.elementType,
  RemoveComponent: PropTypes.elementType,
  currentMesure: PropTypes.number,
  currentPanelType: PropTypes.string,
};

export { MesurePanel };
