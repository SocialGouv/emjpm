import React, { useContext } from "react";
import { useMutation } from "react-apollo";

import { UserContext } from "../../UserContext";
import { EnqueteSubmit } from "../EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { SUBMIT_ENQUETE_REPONSE } from "./mutations";

export const EnqueteIndividuelSubmit = (props) => {
  const { enquete, enqueteReponse, goToFirstPage } = props;
  const { id: enqueteId } = enquete;
  const { id: userId } = useContext(UserContext);
  const [submitEnqueteReponse, { loading }] = useMutation(SUBMIT_ENQUETE_REPONSE, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
    ],
  });

  return (
    <EnqueteSubmit
      loading={loading}
      enquete={enquete}
      enqueteReponse={enqueteReponse}
      goToFirstPage={goToFirstPage}
      submitEnqueteReponse={submitEnqueteReponse}
    />
  );
};

export default EnqueteIndividuelSubmit;
