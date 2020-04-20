import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { Enquete } from "../../../src/components/Enquete";
import { LayoutMandataire } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const EnquetePage = ({ id }) => {
  return (
    <LayoutMandataire>
      <BoxWrapper>
        <Enquete id={id} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

EnquetePage.getInitialProps = async ({ query }) => {
  resetIdCounter();
  return { id: Number(query.id) };
};

export default withAuthSync(EnquetePage);
