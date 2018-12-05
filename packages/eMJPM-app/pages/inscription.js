//

import Head from "next/head";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import Form from "../src/components/inscription/Form";
import { PageTracker } from "../src/components/common/PageTracker";

const Inscription = () => (
  <div style={{ display: "block", backgroundColor: "#cad4de" }}>
    <Head>
      <title>Inscription</title>
    </Head>
    <PageTracker url="/inscription" />
    <Navigation />
    <Form />
    <Footer />
  </div>
);
export default Inscription;
