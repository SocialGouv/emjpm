import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "../../../src/components/Layout";
import { MandataireEnquete } from "../../../src/components/MandataireEnquete";
import { withAuthSync } from "../../../src/util/auth";

const EnquetePage = ({ id }) => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={5}>
        <MandataireEnquete id={id} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

EnquetePage.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default withAuthSync(EnquetePage);
