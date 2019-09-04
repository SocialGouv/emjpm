import React from "react";
import { connect, Provider } from "react-redux";
import { applyMiddleware, bindActionCreators, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as modal } from "redux-modal";
import thunk from "redux-thunk";
import { mandataireMount } from "./actions/mandataire";
import MandataireTabs from "./indiPrepo";
import {
  CloseMesure,
  EditMandataire,
  EditMesure,
  ReactivateMesure,
  ValiderMesureEnAttente
} from "./modals";
import mandataireReducer from "./reducers/mandataire";
import mesuresReducer from "./reducers/mesures";

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
        <EditMesure />
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
    currentMandataire: state.mandataire.user
  }),
  mapDispatchToProps
)(MandataireIndex);

const Mandataires = () => (
  <Provider store={store}>
    <MandataireTabsRedux />
  </Provider>
);

export default Mandataires;
