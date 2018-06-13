import fetch from "isomorphic-fetch";
import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import FormulaireService from "../src/components/formulaireService";
import apiFetch from "../src/components/communComponents/Api";
import Router from "next/router";

const logo = require("!!url-loader?limit=0!../static/images/logo_emjpm.png");

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  componentDidMount() {
    apiFetch(`/mandataires/1/mesures`).then(json => {
      this.setState({
        datamesure: json
      });
    });

    apiFetch(`/mandataires/1`).then(json => {
      this.setState({
        currentMandataire: json
      });
    });
  }

  onlogout = () => {
    fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        Router.push("/login");
      });
  };
  updateMadataire = mesures => {
    this.setState({ currentMandataire: mesures });
  };

  render() {
    const filteredMesures = this.state.datamesure;
    return (
      <Tabs>
        <TabList>
          <div
            className="panel"
            style={{
              textAlign: "left",
              backgroundSize: "cover",
              heigth: "100px !important",
              backgroundColor: "#cad4de"
            }}
          >
            <div className="panel__container" style={{ paddingBottom: "0px" }}>
              <div className="container" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                <h2 style={{ color: "black" }}>
                  {" "}
                  {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom}{" "}
                </h2>
                <div
                  style={{
                    backgroundColor: "#ebeff2",
                    lineHeight: "40px",
                    paddingBottom: "5px"
                  }}
                >
                  <Tab>Vos informations</Tab>
                </div>
              </div>
            </div>
          </div>
        </TabList>
        <div className="container" style={{ backgroundColor: "white", minHeight: "70vh" }}>
          <TabPanel>
            <div style={{ minHeight: "70vh", paddingTop: "10px" }}>
              <FormulaireService
                currentMandataireModal={this.state.currentMandataire}
                updateMadataire={this.updateMadataire}
              />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    );
  }
}

const ServicePage = () => (
  <div style={{ minHeight: "100%" }}>
    <Navigation logout />
    <MandatairesIndex style={{ marginTop: 100 }} />
    <Footer />
  </div>
);

export default ServicePage;
