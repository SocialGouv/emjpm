import React from "react";
import { resetIdCounter } from "react-tabs";

import { DirectionEnqueteDetailsReponsePreview } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsePreview";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const DirectionEnqueteReponsePreviewPage = ({
  enqueteId,
  enqueteReponseId,
}) => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsePreview
          enqueteId={enqueteId}
          enqueteReponseId={enqueteReponseId}
        />
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
