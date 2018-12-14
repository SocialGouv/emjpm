import dynamic from "next/dynamic";
import { Home, Map, UserMinus, Clock, FilePlus } from "react-feather";

import { DummyTabs, LoadingMessage } from "..";
import apiFetch from "../communComponents/Api";

import PillDispo from "./PillDispo";
import Profile from "./Profile";
import TableMesures from "./TableMesures";
import Header from "./Header";
import CreateMesure from "./CreateMesure";
import InputFiles from "./inputFiles";

const OpenStreeMap = dynamic(() => import("./MapMesures"), { ssr: false });

class MandataireTabs extends React.Component {
  render() {
    // define the content of the tabs
    const tabs = [
      {
        text: "Mesures en cours",
        url: "/mandataires/mesures/en-cours",
        icon: <PillDispo />,
        content: (
          <React.Fragment>
            <CreateMesure />
            <TableMesures
              fetch={() => apiFetch(`/mandataires/1/mesures`)}
              hideColumns={[
                "reactiver",
                "extinction",
                "valider",
                "date_demande",
                "ti",
                "status",
                "professionnel"
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
        text: "Mesures éteintes",
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
              "professionnel"
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
        text: "Importer",
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

export default MandataireTabs;
