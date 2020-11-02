import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { Mandataire } from "./Mandataire";

const Mandatairelist = (props) => {
  const {
    selectCurrentMandataire,
    mandataires,
    isMagistrat,
    isMagistratMap,
    ChooseComponent,
  } = props;
  return (
    <Fragment>
      {mandataires.map((mandataire) => {
        return (
          <Mandataire
            selectCurrentMandataire={selectCurrentMandataire}
            ChooseComponent={ChooseComponent}
            isMagistratMap={isMagistratMap}
            isMagistrat={isMagistrat}
            key={mandataire.id}
            mandataire={mandataire}
          />
        );
      })}
    </Fragment>
  );
};

Mandatairelist.defaultProps = {
  ChooseComponent: null,
  isMagistrat: false,
  isMagistratMap: false,
  selectCurrentMandataire: null,
};

Mandatairelist.propTypes = {
  ChooseComponent: PropTypes.elementType,
  isMagistrat: PropTypes.bool,
  isMagistratMap: PropTypes.bool,
  mandataires: PropTypes.arrayOf(
    PropTypes.shape({
      adresse: PropTypes.string.isRequired,
      codePostal: PropTypes.string.isRequired,
      commentaires: PropTypes.shape({
        comment: PropTypes.string,
      }),
      currentAvailability: PropTypes.number.isRequired,
      cvLink: PropTypes.string.isRequired,
      discriminator: PropTypes.string,
      dispoMax: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      etablissement: PropTypes.string,
      genre: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      lastLogin: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      mesuresAwaiting: PropTypes.number,
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
      serviceId: PropTypes.number,
      telephone: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      ville: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectCurrentMandataire: PropTypes.func,
};

export { Mandatairelist };
