import { BoxWrapper, Text } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { LayoutDirection } from "../../../../../src/components/Layout";
import { withAuthSync } from "../../../../../src/util/auth";

const DirectionEnqueteReponsePreviewPage = ({ enqueteId, enqueteReponseId }) => {
  console.log(
    `[DirectionEnqueteReponsePreviewPage] enquete ${enqueteId}, réponse ${enqueteReponseId}`
  );
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <Text>{`La pré-visualisation des réponses à l'enquête n'est pas encore disponible.`}</Text>
      </BoxWrapper>
    </LayoutDirection>
  );
};

DirectionEnqueteReponsePreviewPage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return {
    enqueteId: Number(query.enquete_id),
    enqueteReponseId: Number(query.enquete_reponse_id),
  };
};

export default withAuthSync(DirectionEnqueteReponsePreviewPage);
