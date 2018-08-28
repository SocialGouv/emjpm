import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import FormulaireService from "../src/components/serviceComponents/formulaireService";
import apiFetch from "../src/components/communComponents/Api";
import DislayDate from "../src/components/communComponents/formatFrenchDate";

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  componentDidMount() {
    apiFetch(`/mandataires/1`).then(json => {
      this.setState({
        currentMandataire: json
      });
    });
  }
  updateMadataire = mesures => {
    this.setState({ currentMandataire: mesures });
  };

  render() {
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
                  {this.state.currentMandataire.etablissement} <br />
                </h2>
                <div style={{ textAlign: "right" }}>
                  {" "}
                  {this.state.currentMandataire.update_mesure && (
                    <div>
                      Dernière mise à jour:
                      <DislayDate date={this.state.currentMandataire.update_mesure.slice(0, 10)} />
                    </div>
                  )}
                </div>
                <div
                  style={{ backgroundColor: "#ebeff2", lineHeight: "40px", paddingBottom: "5px" }}
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
