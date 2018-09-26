import styled from "styled-components";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import Form from "../src/components/loginComponents/ForgotPasswordForm";


const ForgotPasswordContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
      <Form />
    </div>
  </div>
);

const ForgotPassword = () => (
  <div style={{ display: "block", backgroundColor: "#cad4de", minHeight: "100%" }}>
    <Navigation />
    <ForgotPasswordContainer style={{ marginTop: 100 }} />
    <Footer fixed />
  </div>
);
export default ForgotPassword;
