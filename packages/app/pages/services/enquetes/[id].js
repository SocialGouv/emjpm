import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { resetIdCounter } from "react-tabs";

import { LayoutServices } from "../../../src/components/Layout";
import { ServiceEnquete } from "../../../src/components/ServiceEnquete";
import { withAuthSync } from "../../../src/util/auth";

const EnqueteServicePage = ({ id }) => {
  return (
    <LayoutServices>
      <BoxWrapper mt={5}>
        <ServiceEnquete id={id} />
      </BoxWrapper>
    </LayoutServices>
  );
};

EnqueteServicePage.getInitialProps = async ({ query }) => {
  resetIdCounter();
  return { id: Number(query.id) };
};

export default withAuthSync(EnqueteServicePage);
