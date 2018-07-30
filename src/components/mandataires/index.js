import dynamic from "next/dynamic";
import { Home, Map, UserMinus } from "react-feather";
import Modal from "react-modal";

import { DummyTabs } from "..";
import apiFetch from "../communComponents/Api";

import PillDispo from "./PillDispo";
import Profile from "./Profile";
import TableMesures from "./TableMesures";
import Header from "./Header";
import CreateMesure from "./CreateMesure";

/* TEMP */
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { mandataireMount } from "./actions/mandataire";
import mesuresReducer from "./reducers/mesures";
import mandataireReducer from "./reducers/mandataire";

Modal.setAppElement("#__next");

// due to leaflet + SSR
const OpenStreeMap = dynamic({
  modules: props => ({
    MapMesures: import("./MapMesures")
  }),
  render: (props, { MapMesures }) => <MapMesures {...props} />
});

class MandataireTabs extends React.Component {
  componentDidMount() {
    // TODO: temp hack to trigger profile load
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    const tabs = [
      {
        text: "Mesures en cours",
        icon: <PillDispo />,
        content: (
          <div>
            <CreateMesure />
            <TableMesures
              fetch={() => apiFetch(`/mandataires/1/mesures`)}
              hideColumns={["reactiver", "extinction"]}
            />
          </div>
        )
      },
      {
        text: "Vue Carte",
        icon: <Map />,
        content: <OpenStreeMap getPromise={() => apiFetch(`/mandataires/1/mesuresForMaps`)} />
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

const rootReducer = combineReducers({
  mesures: mesuresReducer,
  mandataire: mandataireReducer,
  modal
});

const store = createStore(
  rootReducer,
  typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onMount: mandataireMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const MandataireTabsRedux = connect(
  null,
  mapDispatchToProps
)(MandataireTabs);

const Mandataires = () => (
  <Provider store={store}>
    <MandataireTabsRedux />
  </Provider>
);

export default Mandataires;
