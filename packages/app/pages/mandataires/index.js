import React from "react";
import Mandataires from "../../src/components/mandataires";
import { Layout } from "../../src/components";

const MandatairesPage = () => (
  <Layout logout>
    <Mandataires style={{ marginTop: 100 }} />
  </Layout>
);

export default MandatairesPage;
