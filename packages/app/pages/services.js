import React from "react";
import { Layout } from "../src/components";
import Services from "../src/components-v2/service";

const ServicePage = () => (
  <Layout logout>
    <Services style={{ marginTop: 100 }} />
  </Layout>
);

export default ServicePage;
