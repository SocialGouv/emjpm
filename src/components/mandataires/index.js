import dynamic from "next/dynamic";
import styled from "styled-components";
import { Home, Map, UserMinus } from "react-feather";

import { PillDispo, DummyTabs } from "..";

import Profile from "./Profile";
import TableMesures from "./TableMesures";

import apiFetch from "../communComponents/Api";
import DisplayDate from "../communComponents/formatFrenchDate";

const ContainerMandataire = styled.div`
  padding: 10px 0;
  font-size: 1.2em;
  margin-top: 0px;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
  margin: 10px;
`;

const OpenStreeMap = dynamic({
  modules: props => ({
    Map: import("./Map")
  }),
  render: (props, { Map }) => <Map {...props} />
});

// dummy header
const HeaderMandataire = ({ nom, prenom, date_mesure_update }) => (
  <ContainerMandataire className="container">
    <Title>
      {nom} {prenom}
    </Title>
    <div style={{ textAlign: "right", fontSize: "0.8em", color: "#555" }}>
      {date_mesure_update && (
        <div>
          Dernière mise à jour : <DisplayDate date={date_mesure_update.slice(0, 10)} />
        </div>
      )}
    </div>
  </ContainerMandataire>
);

class MandatairesTabs extends React.Component {
  state = {
    data: [],
    datamesure: [],
    mesuresForMaps: [],
    mesureEteinte: [],
    currentMandataire: "",
    mesureEteintes: ""
  };

  componentDidMount() {
    // todo
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
    // todo
    apiFetch(`/mandataires/1/mesures`)
      .then(mesures =>
        apiFetch(`/mandataires/1/mesures/Eteinte`).then(mesureEteinte =>
          this.setState({
            datamesure: mesures,
            mesureEteinte: mesureEteinte
          })
        )
      )
      .then(() =>
        apiFetch(`/mandataires/1`, {
          method: "PUT",
          body: JSON.stringify({
            date_mesure_update: new Date()
          })
        }).then(json2 => {
          this.updateMandataire(json2);
        })
      );
  };

  updateMesure = () => {
    this.onUpdate();
  };

  updateMandataire = mandataire => {
    this.setState({ currentMandataire: mandataire });
  };

  render() {
    const { currentMandataire, mesuresForMaps } = this.state;

    const tabs = [
      {
        text: "Mesures en cours",
        icon: (
          <PillDispo
            dispo={currentMandataire.mesures_en_cours}
            dispo_max={currentMandataire.dispo_max}
          />
        ),
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/1/mesures`)}
            hideColumns={["reactiver", "extinction"]}
          />
        )
      },
      {
        text: "Vue Carte",
        icon: <Map />,
        content: (
          <OpenStreeMap
            width={"100%"}
            style={{ padding: 0 }}
            height={"70vh"}
            postcodeMandataire={[currentMandataire.latitude, currentMandataire.longitude]}
            mesures={mesuresForMaps}
          />
        )
      },
      {
        text: "Mesures éteintes",
        icon: <UserMinus />,
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/1/mesures/Eteinte`)}
            hideColumns={["modifier", "fin-mandat"]}
          />
        )
      },
      {
        text: "Mes informations",
        icon: <Home />,
        content: (
          <Profile
            currentMandataireModal={currentMandataire}
            updateMandataire={this.updateMandataire}
          />
        )
      }
    ];
    return (
      (currentMandataire && (
        <React.Fragment>
          <HeaderMandataire {...currentMandataire} />
          <DummyTabs tabs={tabs} />{" "}
        </React.Fragment>
      )) ||
      null
    );
  }
}

export default MandatairesTabs;
