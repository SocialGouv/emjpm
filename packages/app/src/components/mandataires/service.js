import dynamic from "next/dynamic";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";

import apiFetch from "../communComponents/Api";
import { DummyTabs } from "../index";
import { CheckCircle, Clock, FilePlus, Home, Map, User, UserMinus, XCircle } from "react-feather";
import Profile from "./Profile";
import Header from "./Header";
import TableMesures from "./TableMesures";
import PillDispo from "./PillDispo";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";
import { changeMandataireId } from "./actions/mandataire";
import { DispoMagistrat } from "../common/ShowBox";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });

const getCurrentDispos = props =>
  (props.antenne &&
    props.antenne.dispo_max - props.antenne.mesures_en_cours - props.antenne.mesures_en_attente) ||
  null;

class ServiceTabs extends React.Component {
  render() {
    const onSubmitted = ({ formData }) => {
      this.props.onChange(formData);
    };
    const schema = {
      type: "number",
      enum: this.props.profiles.map && this.props.profiles.map(profile => profile.id),
      enumNames:
        this.props.profiles.map && this.props.profiles.map(profile => profile.etablissement)
    };

    const uiSchema = {
      "ui:options": {
        label: false
      }
    };

    return (
      <>
        <Header handleClick={this.props.handleClick} />
        <Form
          schema={schema}
          formData={this.props.mandataireId}
          uiSchema={uiSchema}
          onChange={onSubmitted}
        >
          {" "}
          <button style={{ display: "none" }} type="submit" />{" "}
        </Form>
        <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
          <ServiceTabsAntennes
            handleClick={this.props.handleClick}
            mandataireID={this.props.mandataireId}
            antenne={
              this.props.profiles.filter &&
              this.props.profiles.filter(profile => profile.id === this.props.mandataireId)[0]
            }
          />
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
        text: "Fins de mandats",
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
        text: "Mesures en attente",
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
              "professionnel",
              "numero_dossier"
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
      <React.Fragment>
        <DummyTabs tabs={tabs} />
      </React.Fragment>
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
