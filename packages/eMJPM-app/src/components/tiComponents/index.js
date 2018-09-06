// @flow
import dynamic from "next/dynamic";
import * as React from "react";
import Modal from "react-modal";
import Router from "next/router";
import { Users, Archive } from "react-feather";

//redux
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import { DummyTabs, LoadingMessage } from "..";
import { tiMount } from "./actions/mandataire";
import mandataireReducer from "./reducers/mandataire";
import mapReducer from "./reducers/map";
import { FicheMandataireModal, ModalMesureValidation, ModalMesureReservation } from "./modals";
import TableMesures from "../mandataires/TableMesures";
import apiFetch from "../communComponents/Api";

Modal.setAppElement("#__next");

const MapTable = dynamic({
  modules: props => ({
    MapTi: import("./MapTi")
  }),
  loading: () => <LoadingMessage />,
  render: (props, { MapTi }) => <MapTi {...props} />
});

class Ti extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  reloadMaps = () => {
    Router.push("/tis");
  };

  render() {
    const tabs = [
      {
        text: "Majeurs Protégés",
        icon: <Users />,
        content: <MapTable fetch={`/mesures/filters`} />
      },
      {
        text: "Mandataires",
        icon: <Users />,
        content: <MapTable fetch={`/mandataires/filters`} isMandataire={true} />
      },
      {
        text: "Mesures attribuées",
        icon: <Archive />,
        content: (
          <TableMesures
            fetch={() => apiFetch(`/mesures/getAllMesuresByTis`)}
            hideColumns={[
              "modifier",
              "reactiver",
              "fin-mandat",
              "extinction",
              "residence",
              "valider",
              "date_demande",
              "ti"
            ]}
          />
        )
      }
    ];
    return (
      <div style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
        <DummyTabs tabs={tabs} />
        <FicheMandataireModal />
        <ModalMesureValidation />
        <ModalMesureReservation />
      </div>
    );
  }
}

const rootReducer = combineReducers({
  mandataire: mandataireReducer,
  modal,
  map: mapReducer
});

const store = createStore(
  rootReducer,
  typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const mapDispatchToProps = dispatch => bindActionCreators({ onMount: tiMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const TiRedux = connect(
  null,
  mapDispatchToProps
)(Ti);

const Tis = () => (
  <Provider store={store}>
    <TiRedux />
  </Provider>
);

export default Tis;
