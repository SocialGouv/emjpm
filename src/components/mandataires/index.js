import dynamic from "next/dynamic";
import { Home, Map, UserMinus, UserPlus } from "react-feather";
import Modal from "react-modal";

import { DummyTabs, LoadingMessage } from "..";
import apiFetch from "../communComponents/Api";

import PillDispo from "./PillDispo";
import Profile from "./Profile";
import TableMesures from "./TableMesures";
import Header from "./Header";
import CreateMesure from "./CreateMesure";

/* TEMP : the redux store will be moved at root level */
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { mandataireMount } from "./actions/mandataire";
import mesuresReducer from "./reducers/mesures";
import mandataireReducer from "./reducers/mandataire";

import {
  EditMesure,
  CloseMesure,
  ReactivateMesure,
  EditMandataire,
  ValiderMesureEnAttente
} from "./modals";

Modal.setAppElement("#__next");

// due to leaflet + SSR
const OpenStreeMap = dynamic({
  modules: props => ({
    MapMesures: import("./MapMesures")
  }),
  loading: () => <LoadingMessage />,
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
    // define the content of the tabs
    const tabs = [
      {
        text: "Mesures en cours",
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
        icon: <Map />,
        content: <OpenStreeMap getPromise={() => apiFetch(`/mandataires/1/mesuresForMaps`)} />
      },
      {
        text: "Mesures éteintes",
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
        icon: <UserPlus />,
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
        icon: <Home />,
        content: <Profile />
      }
    ];
    return (
      <React.Fragment>
        <Header />
        <DummyTabs tabs={tabs} />
        <EditMesure />
        <CloseMesure />
        <ReactivateMesure />
        <EditMandataire />
        <ValiderMesureEnAttente />
      </React.Fragment>
    );
  }
}

// plug redux stuff

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
