import React from "react";

import { Layout } from "../../src/components";
import Mandataires from "../../src/components/mandataires";

const MandatairesPage = () => (
  <Layout logout>
    <Mandataires style={{ marginTop: 100 }} />
  </Layout>
);

export default MandatairesPage;
