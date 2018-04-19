import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";

import Navigation from "../src/components/Navigation";
import TableMesure from "../src/components/TableMesure";
import Footer from "../src/components/Footer";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
import apiFetch from "../src/components/Api";

const Title = styled.div`
  color: black;
  font-size: 1.5em;
`;

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  componentDidMount() {
    // apiFetch(`/mandataires/1/capacite`, {
    //   method: "PUT"
    // }).then(() => {});

    apiFetch(`/mandataires/1/mesures`).then(mesures =>
      apiFetch(`/mandataires/1`).then(mandataire =>
        this.setState({
          datamesure: mesures,
          currentMandataire: mandataire
        })
      )
    );
  }

  updateMesure = mesures => {
    this.setState({ datamesure: mesures });
  };

  updateMadataire = mesures => {
    this.setState({ currentMandataire: mesures });
  };

  render() {
    const filteredMesures = this.state.datamesure;
    const tabStyle = {
      backgroundColor: "#ebeff2",
      lineHeight: "50px",
      paddingBottom: 5,
      bottom: 0
    };
    return (
      <div>
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
                <div
                  className="container"
                  style={{ paddingRight: "0px", paddingLeft: "0px", backgroundColor: "#ebeff2" }}
                >
                  <Title>
                    {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom}
                  </Title>
                  <Tab style={tabStyle}>Mesures en cours</Tab>
                  <Tab style={tabStyle}>Vos informations</Tab>
                </div>
              </div>
            </div>
          </TabList>
          <div className="container" style={{ backgroundColor: "white", minHeight: "70vh" }}>
            <TabPanel>
              <TableMesure rows={filteredMesures} updateMesure={this.updateMesure} />
            </TabPanel>
            <TabPanel>
              <div style={{ minHeight: "70vh", paddingTop: "10px" }}>
                <FormulaireMandataire
                  currentMandataireModal={this.state.currentMandataire}
                  updateMadataire={this.updateMadataire}
                />
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

const MandatairesPage = () => (
  <div style={{ backgroundColor: "#cad4de", minHeight: "100%" }}>
    <Navigation logout />
    <MandatairesIndex style={{ marginTop: 100 }} />
    <Footer />
  </div>
);

export default MandatairesPage;
