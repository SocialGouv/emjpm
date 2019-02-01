import { Clock, Home } from "react-feather";
import Profile from "./Profile";
import Header from "./Header";
import { DummyTabs } from "../index";
import TableMesures from "./TableMesures";
import apiFetch from "../communComponents/Api";

class ServiceTabs extends React.Component {
  render() {
    // define the content of the tabs
    const tabs = [
      {
        text: "Mes informations",
        url: "/mandataires/mes-infos",
        icon: <Home />,
        content: <Profile />
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
              "valider"
            ]}
          />
        )
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

export default ServiceTabs;
