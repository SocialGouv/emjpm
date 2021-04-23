import PropTypes from "prop-types";
import { Fragment } from "react";

import { EnqueteIndividuel } from "./EnqueteIndividuel";
import { EnquetePrepose } from "./EnquetePrepose";
import { EnqueteService } from "./EnqueteService";

export function EnqueteReponse({
  enquete,
  enqueteReponse,
  currentStep,
  navigateToStep,
}) {
  return (
    <>
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
    </>
  );
}

EnqueteReponse.propTypes = {
  currentStep: PropTypes.object.isRequired,
  enquete: PropTypes.object.isRequired,
  enqueteReponse: PropTypes.object.isRequired,
};
