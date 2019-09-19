import React from "react";
import Head from "next/head";

import Form from "../src/components/loginComponents/ForgotPasswordForm";
import { Layout } from "../src/components";
import { PageTracker } from "../src/components/common/PageTracker";

const ForgotPasswordContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 col-sm-12 offset-md-3 col-md-6">
      <Form />
    </div>
  </div>
);

const ForgotPassword = () => (
  <Layout>
    <Head>
      <title>Nouveau mot de passe</title>
    </Head>

    <PageTracker url="/forgot-password" />

    <ForgotPasswordContainer style={{ marginTop: 100 }} />
  </Layout>
);
export default ForgotPassword;
