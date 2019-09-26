import React from "react";
import Head from "next/head";

import { Layout } from "../src/components";
import Form from "../src/components/loginComponents/resetPasswordForm";
import { PageTracker } from "../src/components/common/PageTracker";

const ResetPasswordContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 col-sm-12 offset-md-3 col-md-6">
      <Form />
    </div>
  </div>
);

const ResetPassword = () => (
  <Layout>
    <Head>
      <title>Récupérer votre compte</title>
    </Head>

    <PageTracker url="/reset-password" />

    <ResetPasswordContainer style={{ marginTop: 100 }} />
  </Layout>
);
export default ResetPassword;
