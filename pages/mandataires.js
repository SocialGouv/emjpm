import dynamic from "next/dynamic";
import styled from "styled-components";
import { Home, Map, UserMinus } from "react-feather";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import apiFetch from "../src/components/communComponents/Api";
import Footer from "../src/components/communComponents/Footer";
import FormulaireMandataire from "../src/components/mandataireComponents/FormulaireMandataire";
import Navigation from "../src/components/communComponents/Navigation";
import TableMesure from "../src/components/mandataireComponents/TableMesure";
import DislayDate from "../src/components/communComponents/formatFrenchDate";

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  verticalAlign: "middle",
  lineHeight: "40px",
  flex: "1 0 auto",
  display: "inline-flex"
};

const imageStyle = {
  lineHeight: "50px",
  width: "20px",
  height: "20px",
  color: "black",
  display: "inline-block",
  margin: 10
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
  margin: 10px;
`;

const OpenStreeMap = dynamic({
  modules: props => ({
    MapsPartieMandataire: import("../src/components/mandataireComponents/MapsPartieMandataire")
  }),
  render: (props, { MapsPartieMandataire }) => <MapsPartieMandataire {...props} />
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
    {dispo || 0} / {dispo_max || 0}
  </Pill>
);

const TabListItemTitle = ({ children }) => (
  <div style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>{children}</div>
);

const MandataireIndexView = ({
  currentMandataire,
  filteredMesures,
  updateMadataire,
  updateMesureEteinte,
  mesureEteinte,
  mesuresForMapsMandataire
}) => (
  <Tabs>
    <TabList>
      <PanelMandataire className="panel">
        <ContainerMandataire className="container">
          <Title>
            {currentMandataire.nom} {currentMandataire.prenom}
          </Title>
          <div style={{ textAlign: "right" }}>
            {currentMandataire.date_mesure_update && (
              <div>
                Dernière mise à jour :{" "}
                <DislayDate date={currentMandataire.date_mesure_update.slice(0, 10)} />
              </div>
            )}
          </div>
        </ContainerMandataire>
        <TabsShowMandataire className="container">
          <Tab style={tabStyle}>
            {currentMandataire && (
              <PillDispo
                dispo={currentMandataire.mesures_en_cours}
                dispo_max={currentMandataire.dispo_max}
              />
            )}
            <TabListItemTitle>Mesures en cours</TabListItemTitle>
          </Tab>
          <Tab style={tabStyle}>
            <Map style={imageStyle} />
            <TabListItemTitle>Vue Carte</TabListItemTitle>
          </Tab>
          <Tab style={tabStyle} data-cy="tab-manda-eteinte">
            <UserMinus style={imageStyle} />
            <TabListItemTitle>Mesures éteintes</TabListItemTitle>
          </Tab>
          <Tab style={tabStyle} data-cy="tab-manda-information">
            <Home style={imageStyle} />
            <TabListItemTitle>Mes informations</TabListItemTitle>
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
            mesures={mesuresForMapsMandataire}
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
    mesuresForMaps: [],
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
            apiFetch(`/mandataires/1/mesuresForMaps`).then(mesuresForMaps =>
              this.setState({
                datamesure: mesures,
                mesureEteinte,
                currentMandataire: mandataire,
                mesuresForMaps
              })
            )
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
      .then(() => {
        return apiFetch(`/mandataires/1`, {
          method: "PUT",
          body: JSON.stringify({
              date_mesure_update: new Date()
          })
        }).then(json2 => {
          this.updateMadataire(json2);
        });
      })
      .catch(e => {
        throw e;
      });
  };

  updateMesureEteinte = () => {
    this.onUpdate();
  };

  updateMadataire = mandataire => {
    this.setState({ currentMandataire: mandataire });
  };

  render() {
    const filteredMesures = this.state.datamesure;
    const mesuresForMapsMandataire = this.state.mesuresForMaps;
    return (
      <MandataireIndexView
        currentMandataire={this.state.currentMandataire}
        filteredMesures={filteredMesures}
        updateMesure={this.update_mesure}
        updateMadataire={this.updateMadataire}
        mesureEteinte={this.state.mesureEteinte}
        updateMesureEteinte={this.updateMesureEteinte}
        mesuresForMapsMandataire={mesuresForMapsMandataire}
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
