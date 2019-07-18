import React from "react";
import dynamic from "next/dynamic";
import { Home, Map, UserMinus, Clock, FilePlus } from "react-feather";

import { DummyTabs } from "..";
import apiFetch from "../communComponents/Api";
import { connect } from "react-redux";

import { PillDispo } from "./PillDispo";
import Profile from "./Profile";
import TableMesures from "./TableMesures";
import Header from "./Header";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";
import { DispoMagistrat } from "../common/ShowBox";
import TableState from "../common/TableState";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });
const getCurrentDispos = props =>
  (props.profiles &&
    props.profiles[0] &&
    props.profiles[0].dispo_max -
      props.profiles[0].mesures_en_cours -
      props.profiles[0].mesures_en_attente) ||
  null;

class MandataireTabs extends React.Component {
  state = { activeTabIndex: 0 };

  updateIndexIndi = activeTabIndex => this.setState({ activeTabIndex });

  render() {
    const currentDispos = getCurrentDispos(this.props);

    // define the content of the tabs
    const tabs = [
      {
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours",
        icon: (
          <PillDispo
            mesures_en_cours={
              (this.props.profiles &&
                this.props.profiles[0] &&
                this.props.profiles[0].mesures_en_cours) ||
              0
            }
            dispo_max={
              (this.props.profiles && this.props.profiles[0] && this.props.profiles[0].dispo_max) ||
              0
            }
          />
        ),
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
        )
      },
      {
        text: "Vue Carte",
        url: "/mandataires/vue-carte",
        icon: <Map />,
        content: <OpenStreeMap getPromise={() => apiFetch(`/mandataires/1/mesuresForMaps`)} />
      },
      {
        text: "Fins de mandats",
        url: "/mandataires/mesures/eteintes",
        icon: <UserMinus />,
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
        )
      },
      {
        text: "Mesures en attente",
        url: "/mandataires/mesures/en-attente",
        icon: <Clock />,
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
        )
      },
      {
        text: "Mes informations",
        url: "/mandataires/mes-informations",
        icon: <Home />,
        content: <Profile />
      },
      {
        text: `Importer`,
        url: "/mandataires/importer",
        icon: <FilePlus />,
        content: <InputFiles />
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
    profiles: state.mandataire.profiles,
    mandataireId: state.mandataire.mandataireId
  }),
  null
)(MandataireTabs);
