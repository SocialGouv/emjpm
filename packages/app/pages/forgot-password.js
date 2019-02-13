import Head from "next/head";

import Form from "../src/components/loginComponents/ForgotPasswordForm";
import { Layout } from "../src/components";
import { PageTracker } from "../src/components/common/PageTracker";

const ForgotPasswordContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
      <Form />
    </div>
  </div>
);

const ForgotPassword = () => (
  <Layout>
    <Head>
      <title>Mot de passe oublié</title>
    </Head>

    <PageTracker url="/forgot-password" />

    <ForgotPasswordContainer style={{ marginTop: 100 }} />
  </Layout>
);
export default ForgotPassword;
