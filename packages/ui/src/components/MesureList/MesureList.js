import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Mesure } from './Mesure';

const MesureList = (props) => {
  const {
    mesures,
    onPanelOpen,
    AcceptComponent,
    CloseComponent,
    EditComponent,
    ReactivateComponent,
    RemoveComponent,
    isMagistrat,
  } = props;
  return (
    <Fragment>
      {mesures.map((item) => {
        return (
          <Mesure
            isMagistrat={isMagistrat}
            EditComponent={EditComponent}
            RemoveComponent={RemoveComponent}
            AcceptComponent={AcceptComponent}
            CloseComponent={CloseComponent}
            ReactivateComponent={ReactivateComponent}
            onPanelOpen={onPanelOpen}
            key={item.id}
            {...item}
          />
        );
      })}
    </Fragment>
  );
};

MesureList.defaultProps = {
  AcceptComponent: null,
  CloseComponent: null,
  EditComponent: null,
  ReactivateComponent: null,
  RemoveComponent: null,
  isMagistrat: false,
  onPanelOpen: null,
};

MesureList.propTypes = {
  AcceptComponent: PropTypes.elementType,
  CloseComponent: PropTypes.elementType,
  EditComponent: PropTypes.elementType,
  ReactivateComponent: PropTypes.elementType,
  RemoveComponent: PropTypes.elementType,
  isMagistrat: PropTypes.bool,
  mesures: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.string.isRequired,
      cabinet: PropTypes.string,
      champProtection: PropTypes.string,
      civilite: PropTypes.string.isRequired,
      dateNomination: PropTypes.string.isRequired,
      dateNominationFormated: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isUrgent: PropTypes.bool,
      judgmentDate: PropTypes.date,
      natureMesure: PropTypes.string.isRequired,
      numeroDossier: PropTypes.string.isRequired,
      numeroRg: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      tiId: PropTypes.number,
      ville: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onPanelOpen: PropTypes.func,
};

export { MesureList };
