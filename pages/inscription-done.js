import Router from "next/router";
import styled from "styled-components";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";

const backLogin = () => {
  Router.push("/");
};

const Connection = styled.a`
  color: "#007bff";
  cursor: "pointer";
  margin-top: 10;
  display: "inline-block";
`;
const Inscription = () => (
  <div style={{ display: "block", backgroundColor: "#cad4de" }}>
    <Navigation />

    <div style={{ textAlign: "center", fontSize: "1.3em", marginTop: 100 }}>
      <p>Merci ! Votre demande a bien été prise en compte.</p>
      <p>Notre équipe a été informée et vous recevrez une confirmation très prochainement.</p>

      <Connection href="#" onClick={backLogin}>
        Se connecter
      </Connection>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>

    <Footer />
  </div>
);
export default Inscription;
