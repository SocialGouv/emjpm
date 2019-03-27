import dynamic from "next/dynamic";

import apiFetch from "../communComponents/Api";
import { DummyTabs } from "../index";
import Router from "next/router";

import { CheckCircle, Clock, FilePlus, Home, Map, User, UserMinus, XCircle } from "react-feather";
import Profile from "./Profile";
import Header from "./Header";
import TableMesures from "./TableMesures";
import PillDispo from "./PillDispo";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import { bindActionCreators } from "redux";
import { changeEnum } from "./actions/mandataire";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });

class ServiceTabs extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.enum !== this.props.enum) {
      this.forceUpdate()
    }
  }
  render() {
    const onSubmitted = ({ formData }) => {
      this.props.onChange(formData);
    };

    const schema = {
      type: "number",
      enum: this.props.antennesMandas.map(antenne => antenne.id),
      enumNames: this.props.antennesMandas.map(antenne => antenne.etablissement)
    };

    const uiSchema = {
      "ui:options": {
        label: false
      }
    };

    return (
      <>
        <Header handleClick={this.props.handleClick} />
        <Form schema={schema} formData={this.props.enum} uiSchema={uiSchema} onChange={onSubmitted}>
          {" "}
          <button style={{ display: "none" }} type="submit" />{" "}
        </Form>
        <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
          <ServiceTabsAntennes
            handleClick={this.props.handleClick}
            mandataireID={this.props.enum}
            antenne={this.props.antennesMandas.filter(antenne => antenne.id === this.props.enum)[0]}
          />
        </div>
      </>
    );
  }
}

class ServiceTabsAntennes extends React.Component {
  render() {
    const Alert = ({ className, Icon, message }) =>
      (message && (
        <div
          className={`alert ${className || ""}`}
          role="alert"
          style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
        >
          <Icon
            style={{
              verticalAlign: "middle",
              marginRight: 10
            }}
          />{" "}
          {message}
        </div>
      )) ||
      null;

    const ErrorBox = ({ message }) => (
      <Alert className="alert-danger" Icon={XCircle} message={message} />
    );

    const SucessBox = ({ message }) => (
      <Alert className="alert-success" Icon={CheckCircle} message={message} />
    );

    const currentDispos =
      (this.props.antenne &&
        this.props.antenne.dispo_max -
          this.props.antenne.mesures_en_cours -
          this.props.antenne.mesures_en_attente) ||
      null;

    const tabs = [
      {
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours",
        icon: <PillDispo mandataireId={this.props.mandataireID} />,
        content: (
          <React.Fragment>
            <CreateMesure mandataireId={this.props.mandataireID} />
            {currentDispos > 0 ? (
              <div>
                <SucessBox
                  message={`Les magistrats voient que ${currentDispos} peuvent vous être attribuées.`}
                />
              </div>
            ) : currentDispos ? (
              <div>
                <ErrorBox
                  message={`Les magistrats voient que le nombre de mesures dépasse
          le nombre souhaité de ${currentDispos} mesures.`}
                />
              </div>
            ) : (
              ""
            )}
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
      <React.Fragment>
        <DummyTabs tabs={tabs} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onChange: changeEnum }, dispatch);

export default connect(
  state => ({
    antennesMandas: state.mandataire.antennes,
    enum: state.mandataire.enum
  }),
  mapDispatchToProps
)(ServiceTabs);
