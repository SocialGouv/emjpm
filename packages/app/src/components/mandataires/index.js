import React from "react";
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { mandataireMount } from "./actions/mandataire";
import mesuresReducer from "./reducers/mesures";
import mandataireReducer from "./reducers/mandataire";
import MandataireTabs from "./indiPrepo";

import { CloseMesure, ReactivateMesure, EditMandataire, ValiderMesureEnAttente } from "./modals";

class MandataireIndex extends React.Component {
  state = {
    isToggleOn: false
  };

  componentDidMount() {
    // TODO: temp hack to trigger profile load
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  };

  render() {
    return (
      <React.Fragment>
        <MandataireTabs />
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

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const mapDispatchToProps = dispatch => bindActionCreators({ onMount: mandataireMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const MandataireTabsRedux = connect(
  state => ({
    currentMandataire:
      (state.mandataire.profiles && state.mandataire.profiles[0]) || state.mandataire.user,
    service: state.mandataire.service
  }),
  mapDispatchToProps
)(MandataireIndex);

const Mandataires = () => (
  <Provider store={store}>
    <MandataireTabsRedux />
  </Provider>
);

export default Mandataires;
