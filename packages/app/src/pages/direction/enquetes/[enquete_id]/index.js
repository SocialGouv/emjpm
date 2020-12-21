import React from "react";
import { resetIdCounter } from "react-tabs";

import { DirectionEnqueteDetailsReponsesList } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const DirectionEnqueteDetailsPage = ({ enqueteId }) => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
};

DirectionEnqueteDetailsPage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(DirectionEnqueteDetailsPage);
