import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { DirectionEnqueteDetailsReponsesList } from "../../../../src/components/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";

const DirectionEnqueteDetailsReponsesListPage = ({ enqueteId }) => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
};

DirectionEnqueteDetailsReponsesListPage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(DirectionEnqueteDetailsReponsesListPage);
