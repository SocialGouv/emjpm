import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

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
  resetIdCounter();
  console.log("=> resetIdCounter");
  return { id: Number(query.id) };
};

export default withAuthSync(EnquetePage);
