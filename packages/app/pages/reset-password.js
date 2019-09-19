import React from "react";
import Head from "next/head";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
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
  <div style={{ display: "block", backgroundColor: "#cad4de", minHeight: "100%" }}>
    <Head>
      <title>Récupérer votre compte</title>
    </Head>

    <PageTracker url="/reset-password" />

    <Navigation />
    <ResetPasswordContainer style={{ marginTop: 100 }} />
    <Footer fixed />
  </div>
);
export default ResetPassword;
