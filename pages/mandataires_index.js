import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import Navigation from "../src/components/Navigation";
import TableMesure from "../src/components/TableMesure";
import Footer from "../src/components/Footer";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
import apiFetch from "../src/components/Api";
import dynamic from "next/dynamic";
import { Home, Map, User, UserMinus } from "react-feather";

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  verticalAlign: "middle",
  lineHeight: "40px",
  width: "25%",
  display: "inline-flex"
};
const imageStyle = {
  lineHeight: "50px",
  width: "35px",
  height: "35px",
  color: "black",
  display: "inline-block"
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

const PanelMandataire = styled.div`
  text-align: "left",
  background-size: cover;
  heigth: 100px !important;
  background-color: #cad4de;
`;

const ContainerMandataire = styled.div`
  padding-right: 0px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 0px;
  font-size: 1.2em;
  margin-top: 0px;
`;

const TabsShowMandataire = styled.div`
  padding-right: 0px;
  padding-left: 0px;
  background-color: #ebeff2;
  height: 60px;
`;
const TabsPanelMandataire = styled.div`
  background-color: white;
  min-height: 70vh;
  padding: 0px;
`;

const FormuaireMandataire = styled.div`
  min-height: 70vh;
  padding-top: 10px;
`;

const OpenStreeMapMandataire = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const MandatairesPageStlye = styled.div`
  background-color: #cad4de;
  min-height: 100%;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
`;

const OpenStreeMap = dynamic(import("../src/components/MapsPartieMandataire"), {
  ssr: false,
  loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
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
  updateMadataire,
  updateMesureEteinte,
  mesureEteinte
}) => (
  <Tabs>
    <TabList>
      <PanelMandataire className="panel">
        <ContainerMandataire className="container">
          <Title>
            {currentMandataire.nom} {currentMandataire.prenom}
          </Title>
        </ContainerMandataire>
        <TabsShowMandataire className="container">
          <Tab style={tabStyle}>
            <PillDispo
              dispo={currentMandataire.disponibilite}
              dispo_max={currentMandataire.dispo_max}
            />
            <b>Mesures en cours</b>
          </Tab>
          <Tab style={tabStyle}>
            <Map style={imageStyle} />
            <b>Vue Carte</b>
          </Tab>
          <Tab style={tabStyle}>
            <UserMinus style={imageStyle} />
            <b>Mesures éteintes</b>
          </Tab>
          <Tab style={tabStyle}>
            <Home style={imageStyle} />
            <b>Vos informations</b>
          </Tab>
        </TabsShowMandataire>
      </PanelMandataire>
    </TabList>
    <TabsPanelMandataire className="container">
      <TabPanel>
        <TableMesure
          display_ext={"none"}
          rows={filteredMesures}
          updateMesureEteinte={updateMesureEteinte}
        />
      </TabPanel>
      <TabPanel>
        <OpenStreeMapMandataire className="container">
          <OpenStreeMap
            width={"100%"}
            height={"70vh"}
            postcodeMandataire={[currentMandataire.latitude, currentMandataire.longitude]}
            mesures={filteredMesures}
          />
        </OpenStreeMapMandataire>
      </TabPanel>
      <TabPanel>
        <TableMesure
          display={"none"}
          rows={mesureEteinte}
          updateMesureEteinte={updateMesureEteinte}
        />
      </TabPanel>
      <TabPanel>
        <FormuaireMandataire>
          <FormulaireMandataire
            currentMandataireModal={currentMandataire}
            updateMadataire={updateMadataire}
          />
        </FormuaireMandataire>
      </TabPanel>
    </TabsPanelMandataire>
  </Tabs>
);

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    mesureEteinte: [],
    currentMandataire: "",
    mesureEteintes: ""
  };

  componentDidMount() {
    // apiFetch(`/mandataires/1/capacite`, {
    //   method: "PUT"
    // }).then(() => {});

    apiFetch(`/mandataires/1/mesures`)
      .then(mesures =>
        apiFetch(`/mandataires/1`).then(mandataire =>
          apiFetch(`/mandataires/1/mesures/Eteinte`).then(mesureEteinte =>
            this.setState({
              datamesure: mesures,
              mesureEteinte: mesureEteinte,
              currentMandataire: mandataire
            })
          )
        )
      )
      .catch(e => {
        throw e;
      });
  }

  onUpdate = () => {
    apiFetch(`/mandataires/1/mesures`)
      .then(mesures =>
        apiFetch(`/mandataires/1/mesures/Eteinte`).then(mesureEteinte =>
          this.setState({
            datamesure: mesures,
            mesureEteinte: mesureEteinte
          })
        )
      )
      .catch(e => {
        throw e;
      });
  };

  updateMesureEteinte = () => {
    this.onUpdate();
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
        mesureEteinte={this.state.mesureEteinte}
        updateMesureEteinte={this.updateMesureEteinte}
      />
    );
  }
}

const MandatairesPage = () => (
  <MandatairesPageStlye>
    <Navigation logout />
    <MandatairesIndex style={{ marginTop: 100 }} />
    <Footer />
  </MandatairesPageStlye>
);

export default MandatairesPage;
