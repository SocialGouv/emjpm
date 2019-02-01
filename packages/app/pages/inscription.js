//

import Head from "next/head";

import Layout from "../src/components/common/Layout";
import Form from "../src/components/inscription/Form";
import { PageTracker } from "../src/components/common/PageTracker";

const Inscription = () => (
  <Layout>
    <Head>
      <title>Inscription</title>
    </Head>
    <PageTracker url="/inscription" />
    <Form />
  </Layout>
);
export default Inscription;
