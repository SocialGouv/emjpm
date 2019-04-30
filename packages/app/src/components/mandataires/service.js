import dynamic from "next/dynamic";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";

import apiFetch from "../communComponents/Api";
import { DummyTabs } from "../index";
import {
  CheckCircle,
  MinusSquare,
  Clock,
  FilePlus,
  Home,
  Map,
  User,
  UserMinus,
  Plus,
  XCircle
} from "react-feather";
import Profile from "./Profile";
import Header from "./Header";
import TableMesures from "./TableMesures";
import PillDispo from "./PillDispo";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";
import { changeMandataireId } from "./actions/mandataire";
import { DispoMagistrat } from "../common/ShowBox";
import styled from "styled-components";
import { show } from "redux-modal";
import * as React from "react";
import { AddAntennes } from "./modals";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });

const getCurrentDispos = props =>
  (props.antenne &&
    props.antenne.dispo_max - props.antenne.mesures_en_cours - props.antenne.mesures_en_attente) ||
  null;

const SiegeSocial = styled.div`
  background-color: ${props => (props.id === props.mandataireId ? "white" : "#ebedf0")};
  font-weight: ${props => (props.id === props.mandataireId ? "bold" : "normal")};
  text-transform: none;
  width: 200px;
  height: 120px;
  font-size: 1em;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  flex: "1 0 auto";
  margin-right: 10px;
  overflow: scroll;
  border-radius: 5px;
  vertical-align: middle;
  text-align: center;
  line-height: 40px;
  :hover {
    background-color: white;
  }
`;

const AjoutAntenne = connect(
  state => ({
    service: state.mandataire.service
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show, service }) => (
  <SiegeSocial
    onClick={() => show("AddAntennes")}
    style={{ lineHeight: "20px", backgroundColor: "transparent" }}
  >
    <Plus /> <br />
    <b>Ajouter une antenne</b>
  </SiegeSocial>
));

class ServiceTabs extends React.Component {
  render() {
    const onSubmitted = formData => {
      this.props.onChange(formData);
    };
    console.log("props",this.props.profiles )
    return (
      <>
        <Header handleClick={this.props.handleClick} />
        <h4 style={{ fontWeight: "bold" }}>Vos antennes</h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {this.props.profiles.length &&
            this.props.profiles.length !== 0 &&
            this.props.profiles.map &&
            this.props.profiles.map(profile => (
              <SiegeSocial
                id={profile.id}
                mandataireId={this.props.mandataireId}
                onClick={() => onSubmitted(profile.id)}
              >
                {profile.etablissement} <br/>
                <div style={{lineHeight: "20px"}}>
                {profile.mesures_en_cours} / {profile.dispo_max} <br/>
                Mesures en cours
                </div>
              </SiegeSocial>
            ))}
          <AjoutAntenne />
        </div>
        <div style={{ background: "rgb(215, 223, 232)" }}>
          {this.props.profiles.length &&
            this.props.profiles.length !== 0 &&
            this.props.profiles.map && (
              <ServiceTabsAntennes
                handleClick={this.props.handleClick}
                mandataireID={this.props.mandataireId}
                antenne={
                  this.props.profiles.filter &&
                  this.props.profiles.filter(profile => profile.id === this.props.mandataireId)[0]
                }
              />
            )}
        </div>
      </>
    );
  }
}

class ServiceTabsAntennes extends React.Component {
  render() {
    const currentDispos = getCurrentDispos(this.props);

    const tabs = [
      {
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours",
        icon: (
          <PillDispo
            mesures_en_cours={this.props.antenne && this.props.antenne.mesures_en_cours}
            dispo_max={this.props.antenne && this.props.antenne.dispo_max}
          />
        ),
        content: (
          <React.Fragment>
            <CreateMesure mandataireId={this.props.mandataireID} />
            <DispoMagistrat currentDispos={currentDispos} />

            <TableMesures
              fetch={() => apiFetch(`/mandataires/${this.props.mandataireID}/mesures`)}
              hideColumns={[
                "reactiver",
                "extinction",
                "valider",
                "date_demande",
                "ti",
                "status",
                "professionnel",
                "mandataire_id"
              ]}
            />
          </React.Fragment>
        )
      },
      {
        text: "Vue Carte",
        url: "/mandataires/vue-carte",
        icon: <Map />,
        content: (
          <OpenStreeMap
            getPromise={() => apiFetch(`/mandataires/${this.props.mandataireID}/mesuresForMaps`)}
          />
        )
      },
      {
        text: "Mesures éteintes",
        url: "/mandataires/mesures/eteintes",
        icon: <UserMinus />,
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/${this.props.mandataireID}/mesures/Eteinte`)}
            hideColumns={[
              "modifier",
              "fin-mandat",
              "valider",
              "date_demande",
              "ti",
              "status",
              "professionnel",
              "mandataire_id"
            ]}
          />
        )
      },
      {
        text: "Mesures réservées",
        url: "/mandataires/mesures/en-attente",
        icon: <Clock />,
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mandataires/${this.props.mandataireID}/mesures/attente`)}
            hideColumns={[
              "date_ouverture",
              "modifier",
              "reactiver",
              "fin-mandat",
              "extinction",
              "residence",
              "status",
              "professionnel"
            ]}
          />
        )
      },
      {
        text: "Mes informations",
        url: "/mandataires/mes-informations",
        icon: <Home />,
        content: <Profile mandataireId={this.props.mandataireID} />,
        mandataireId: this.props.mandataireID
      },
      {
        text: `Importer`,
        url: "/mandataires/importer",
        icon: <FilePlus />,
        content: <InputFiles mandataireId={this.props.mandataireID} />,
        mandataireId: this.props.mandataireID
      }
    ];
    return (
      <React.Fragment>{this.props.mandataireId !== 0 && <DummyTabs tabs={tabs} />}</React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onChange: changeMandataireId }, dispatch);

export default connect(
  state => ({
    profiles: state.mandataire.profiles,
    mandataireId: state.mandataire.mandataireId,
    lastUpdate: state.mandataire.lastUpdate
  }),
  mapDispatchToProps
)(ServiceTabs);
