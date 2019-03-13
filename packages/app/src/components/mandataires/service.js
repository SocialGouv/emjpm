import dynamic from "next/dynamic";

import apiFetch from "../communComponents/Api";
import { DummyTabs } from "../index";
import { Button, DummyTabs, Layout } from "..";

import Profile from "./Profile";
import Header from "./Header";
import TableMesures from "./TableMesures";
import PillDispo from "./PillDispo";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";
import { connect } from "react-redux";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });

class ServiceTabs extends React.Component {
  render() {
    const tabsrigth = this.props.antennesMandas.map(antenne => ({
      text: antenne.etablissement,
      url: "/admin/users",
      icon: <User />,
      content: (
        <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
          <ServiceTabsTry mandataireID={antenne.id} />
        </div>
      )
    }));

    return (
      <Layout logout>
        <DummyTabs tabs={tabsrigth} />
      </Layout>
    );
  }
}

class ServiceTabsTry extends React.Component {
  state = {
    mandataireId: null
  };

  onChange = ({ formData }) => {
    this.setState({
      mandataireId: formData
    });
  };

  render() {
    const tabs = [
      {
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours",
        icon: <PillDispo />,
        content: (
          <React.Fragment>
            <CreateMesure />
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
        <DummyTabs tabs={tabs} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    antennesMandas: state.mandataire.antennes
  }),
  null
)(ServiceTabs);
