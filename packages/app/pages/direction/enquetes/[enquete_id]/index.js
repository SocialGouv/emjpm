import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { DirectionEnqueteDetails } from "../../../../src/components/EnqueteDirection";
import { LayoutDirection } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";

const DirectionEnquetePage = ({ enqueteId }) => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetails enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
};

DirectionEnquetePage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(DirectionEnquetePage);
