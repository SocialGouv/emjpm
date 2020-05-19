import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { Enquete } from "../../../../src/components/Enquete";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";

const EnquetePage = ({ enqueteId }) => {
  return (
    <LayoutMandataire>
      <BoxWrapper>
        <Enquete id={enqueteId} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

EnquetePage.getInitialProps = async ({ query }) => {
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(EnquetePage);
