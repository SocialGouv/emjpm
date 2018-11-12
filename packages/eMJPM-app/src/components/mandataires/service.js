import { Home } from "react-feather";
import Profile from "./Profile";
import Header from "./Header";
import { DummyTabs } from "../index";

class ServiceTabs extends React.Component {
  render() {
    // define the content of the tabs
    const tabs = [
      {
        text: "Mes informations",
        icon: <Home />,
        content: <Profile />
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
