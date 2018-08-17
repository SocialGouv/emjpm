// @flow
import dynamic from "next/dynamic";
import * as React from "react";
import Modal from "react-modal";
import Router from "next/router";

//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DummyTabs } from "..";
import { tiMount } from "./actions/mandataire";
import mandataireReducer from "./reducers/mandataire";
import { FicheMandataireModal } from "./modals";

Modal.setAppElement("#__next");

const OpenStreeMap = dynamic({
  modules: props => ({
    MapTi: import("./MapTi")
  }),
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
        content: <OpenStreeMap fetch={`/mesures/filters`} />
      },
      {
        text: "Mandataires",
        content: <OpenStreeMap fetch={`/mandataires/filters`} isMandataire={true} />
      }
    ];
    return (
      <div className="container" style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
        <DummyTabs tabs={tabs} />
        <FicheMandataireModal />
      </div>
    );
  }
}

const rootReducer = combineReducers({
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
