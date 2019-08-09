import React from "react";
import Services from "../src/components/service";
import { Layout } from "../src/components";

const ServicePage = () => (
  <Layout logout>
    <Services style={{ marginTop: 100 }} />
  </Layout>
);

export default ServicePage;
