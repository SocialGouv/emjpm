import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { EnqueteIndividuel } from "./EnqueteIndividuel";
import { EnquetePrepose } from "./EnquetePrepose";
import { EnqueteService } from "./EnqueteService";

export const EnqueteReponse = ({ enquete, enqueteReponse, currentStep, userId }) => {
  return (
    <Fragment>
      {enqueteReponse.user_type === "individuel" && (
        <EnqueteIndividuel
          userId={userId}
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
        />
      )}

      {enqueteReponse.user_type === "prepose" && (
        <EnquetePrepose
          userId={userId}
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
        />
      )}

      {enqueteReponse.user_type === "service" && (
        <EnqueteService
          userId={userId}
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
        />
      )}
    </Fragment>
  );
};

EnqueteReponse.propTypes = {
  userId: PropTypes.number.isRequired,
};
