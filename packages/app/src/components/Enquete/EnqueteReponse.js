import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { EnqueteIndividuel } from "./EnqueteIndividuel";
import { EnquetePrepose } from "./EnquetePrepose";
import { EnqueteService } from "./EnqueteService";

export const EnqueteReponse = ({ enquete, enqueteReponse, currentStep, navigateToStep }) => {
  return (
    <Fragment>
      {enqueteReponse.user_type === "individuel" && (
        <EnqueteIndividuel
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      )}

      {enqueteReponse.user_type === "prepose" && (
        <EnquetePrepose
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      )}

      {enqueteReponse.user_type === "service" && (
        <EnqueteService
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      )}
    </Fragment>
  );
};

EnqueteReponse.propTypes = {
  enquete: PropTypes.object.isRequired,
  enqueteReponse: PropTypes.object.isRequired,
  currentStep: PropTypes.object.isRequired,
};
