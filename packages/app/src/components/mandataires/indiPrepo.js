import dynamic from "next/dynamic";
import React from "react";
import { Clock, Home, Map, UserMinus } from "react-feather";
import { connect } from "react-redux";

import { DummyTabs } from "..";
import { DispoMagistrat } from "../common/ShowBox";
import TableState from "../common/TableState";
import apiFetch from "../communComponents/Api";
import CreateMesure from "./CreateMesure";
import Header from "./Header";
import { PillDispo } from "./PillDispo";
import Profile from "./Profile";
import TableMesures from "./TableMesures";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });
const getCurrentDispos = props =>
  (props.profiles &&
    props.profiles.dispo_max -
      props.profiles.mesures_en_cours -
      props.profiles.mesures_en_attente) ||
  null;

class MandataireTabs extends React.Component {
  state = { activeTabIndex: 0 };

  updateIndexIndi = activeTabIndex => this.setState({ activeTabIndex });

  render() {
    const currentDispos = getCurrentDispos(this.props);

    // define the content of the tabs
    const tabs = [
      {
        content: (
          <React.Fragment>
            <CreateMesure />
            <DispoMagistrat currentDispos={currentDispos} updateIndexIndi={this.updateIndexIndi} />
            <TableMesures
              fetch={() => apiFetch(`/mandataires/1/mesures`)}
              hideColumns={[
                "reactiver",
                "extinction",
                "valider",
                "date_demande",
                "ti",
                "status",
                "professionnel",
                "mandataire_id",
                "reason_fin_de_mandat",
                "fin-mandat-attente"
              ]}
            />
          </React.Fragment>
        ),
        icon: (
          <PillDispo
            mesures_en_cours={(this.props.profiles && this.props.profiles.mesures_en_cours) || 0}
            dispo_max={(this.props.profiles && this.props.profiles.dispo_max) || 0}
          />
        ),
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours"
      },
      {
        content: <OpenStreeMap getPromise={() => apiFetch(`/mandataires/1/mesuresForMaps`)} />,
        icon: <Map />,
        text: "Vue Carte",
        url: "/mandataires/vue-carte"
      },
      {
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/1/mesures/Eteinte`)}
            hideColumns={[
              "modifier",
              "fin-mandat",
              "valider",
              "date_demande",
              "ti",
              "status",
              "professionnel",
              "mandataire_id",
              "fin-mandat-attente"
            ]}
          />
        ),
        icon: <UserMinus />,
        text: "Fins de mandats",
        url: "/mandataires/mesures/eteintes"
      },
      {
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/1/mesures/attente`)}
            hideColumns={[
              "date_ouverture",
              "modifier",
              "reactiver",
              "fin-mandat",
              "extinction",
              "residence",
              "status",
              "professionnel",
              "mandataire_id",
              "numero_dossier",
              "reason_fin_de_mandat",
              "fin-mandat-attente"
            ]}
          />
        ),
        icon: <Clock />,
        text: "Mesures en attente",
        url: "/mandataires/mesures/en-attente"
      },
      {
        content: <Profile />,
        icon: <Home />,
        text: "Mes informations",
        url: "/mandataires/mes-informations"
      }
    ];
    return (
      <React.Fragment>
        <Header />
        <TableState
          activeTabIndex={this.state.activeTabIndex}
          render={({ onSelect, activeTabIndex }) => {
            return <DummyTabs tabs={tabs} onSelect={onSelect} activeTabIndex={activeTabIndex} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    mandataireId: state.mandataire.mandataireId,
    profiles: state.mandataire.profiles
  }),
  null
)(MandataireTabs);
