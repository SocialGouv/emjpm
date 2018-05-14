import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import Navigation from "../src/components/Navigation";
import TableMesure from "../src/components/TableMesure";
import Footer from "../src/components/Footer";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
import apiFetch from "../src/components/Api";
import dynamic from "next/dynamic";

const Title = styled.div`
  color: black;
  font-size: 1.5em;
`;

const OpenStreeMap = dynamic(import("../src/components/Map"), {
  ssr: false,
  loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

const tabStyle = {
  backgroundColor: "#ebeff2",
  lineHeight: "50px",
  paddingBottom: 5,
  bottom: 0
};

const Pill = styled.p`
  font-size: 18px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  text-align: center;
  color: white;
  display: inline-block;
  margin-right: 10px;
`;

const nbCol = 4;

const antenne = require("../static/images/home.svg");
const map = require("../static/images/map.svg");
const person = require("../static/images/user.svg");
const minus = require("../static/images/user-minus.svg");

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

const getSize = nbCol => {
  if (nbCol == 4) {
    return "25%";
  }
  return "50%";
};

const PillDispo = ({ dispo, dispo_max }) => (
  <Pill
    style={{
      background: getColorFromDisponibilite(dispo_max - dispo)
    }}
  >
    {dispo} / {dispo_max}
  </Pill>
);

const MandataireIndexView = ({
  currentMandataire,
  filteredMesures,
  updateMesure,
  updateMadataire
}) => (
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
        <div
          className="container"
          style={{
            paddingRight: "0px",
            paddingBottom: "10px",
            paddingTop: "10px",
            paddingLeft: "0px",
            fontSize: "1.2em",
            marginTop: "0px"
          }}
        >
          <Title>
            {currentMandataire.nom} {currentMandataire.prenom}
          </Title>
        </div>
        <div
          className="container"
          style={{
            paddingRight: "0px",
            paddingLeft: "0px",
            backgroundColor: "#ebeff2",
            height: "60px"
          }}
        >
          <Tab
            style={{
              tabStyle,
              verticalAlign: "middle",
              lineHeight: "40px",
              width: getSize(nbCol)
            }}
          >
            <PillDispo
              dispo={currentMandataire.disponibilite}
              dispo_max={currentMandataire.dispo_max}
            />
            <b>Mesures en cours</b>
          </Tab>
          <Tab
            style={{
              tabStyle,
              verticalAlign: "middle",
              lineHeight: "40px",
              width: getSize(nbCol)
            }}
          >
            <img src={map} style={{ padding: "5px", width: "35px ", height: "35px " }} />
            <b>Vue Carte</b>
          </Tab>
          <Tab
            style={{
              tabStyle,
              verticalAlign: "middle",
              lineHeight: "40px",
              width: getSize(nbCol)
            }}
          >
            <img src={minus} style={{ padding: "5px", width: "35px ", height: "35px " }} />
            <b>Mesures éteintes</b>
          </Tab>
          <Tab
            style={{
              tabStyle,
              verticalAlign: "middle",
              lineHeight: "40px",
              width: getSize(nbCol)
            }}
          >
            <img src={antenne} style={{ padding: "5px", width: "35px ", height: "35px " }} />
            <b>Vos informations</b>
          </Tab>
        </div>
      </div>
    </TabList>
    <div
      className="container"
      style={{ backgroundColor: "white", minHeight: "70vh", padding: "0px" }}
    >
      <TabPanel>
        <TableMesure display_ext={"none"} rows={filteredMesures} updateMesure={updateMesure} />
      </TabPanel>
      <TabPanel>
        <div className="container" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <OpenStreeMap
            width={"100%"}
            height={"70vh"}
            postcodeMandataire={[currentMandataire.latitude, currentMandataire.longitude]}
            mesures={filteredMesures}
          />
        </div>
      </TabPanel>
      <TabPanel>
        <TableMesure display={"none"} rows={filteredMesures} updateMesure={updateMesure} />
      </TabPanel>
      <TabPanel>
        <div style={{ minHeight: "70vh", paddingTop: "10px" }}>
          <FormulaireMandataire
            currentMandataireModal={currentMandataire}
            updateMadataire={updateMadataire}
          />
        </div>
      </TabPanel>
    </div>
  </Tabs>
);

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    mesureEteintes: ""
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
    return (
      <MandataireIndexView
        currentMandataire={this.state.currentMandataire}
        filteredMesures={filteredMesures}
        updateMesure={this.updateMesure}
        updateMadataire={this.updateMadataire}
      />
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
