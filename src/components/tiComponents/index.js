// @flow
import dynamic from "next/dynamic";
import * as React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Router from "next/router";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DummyTabs } from "..";
import apiFetch from "../communComponents/Api";
import { tiMount } from "./actions/mandataire";
import mandataireReducer from "./reducers/mandataire";
import { FicheMandataireModal } from "./modals";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  textAlign: "middle",
  verticalAlign: "middle",
  lineHeight: "40px",
  width: "50%",
  display: "inline-flex"
};

const TabsShowMandataire = styled.div`
  padding-right: 0px;
  padding-left: 0px;
  background-color: #ebeff2;
  height: 60px;
`;
Modal.setAppElement("#__next");

const OpenStreeMap = dynamic({
  modules: props => ({
    MapTi: import("./MapTi")
  }),
  render: (props, { MapTi }) => <MapTi {...props} />
});

const ModalMandataire = ({ isOpen, closeModal, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    contentLabel="mandataire"
    background="#e9ecef"
    className="Modal"
    overlayClassName="Overlay"
  >
    <button onClick={closeModal}>X</button>
    {children}
  </Modal>
);

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

class Ti extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  openModal = mandataire => {
    return apiFetch(`/mandataires/${mandataire.id}/tisEtablissement`).then(
      currentEtablissementsForSelectedMandataire =>
        apiFetch(`/mandataires/${mandataire.id}/tis-by-mandataire`)
          .then(allTisForOneMandataire => {
            this.setState({
              currentEtablissementsForSelectedMandataire,
              allTisForOneMandataire,
              modalIsOpen: true,
              currentMandataire: mandataire
            });
          })
          .catch(e => {
            console.log(e);
          })
    );
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  updateMesures = mesures => {
    this.setState({ datamesure: mesures });
  };

  updateMandataireMesures = mesures => {
    this.setState({ mandaMesures: mesures });
  };

  updateMandataireFilters = mandataires => {
    this.setState({ manda: mandataires });
  };

  updateFilters = filters => {
    this.setState(filters, () => this.changeTypeOfMandatairesFilters(filters));
  };
  updateValue = value => {
    this.setState({ value: value });
  };

  updatePostCodeMandataires = mesures => {
    this.setState({ postcodeCoordinates: [mesures.longitude, mesures.latitude] });
  };

  updatePostCodeMandatairesByCommune = mesures => {
    this.setState({ postcodeCoordinates: mesures });
  };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

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

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onMount: tiMount }, dispatch);

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
