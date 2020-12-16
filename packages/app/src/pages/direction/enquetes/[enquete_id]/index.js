import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { DirectionEnqueteDetailsReponsesList } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/components/Layout";
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
