import { createStore, combineReducers, applyMiddleware, bindActionCreators } from "redux";
import { reducer as modal } from "redux-modal";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { mandataireMount } from "./actions/mandataire";
import mesuresReducer from "./reducers/mesures";
import mandataireReducer from "./reducers/mandataire";
import MandataireTabs from "./indiPrepo";
import ServiceTabs from "./service";
import {
  EditMesure,
  CloseMesure,
  ReactivateMesure,
  EditMandataire,
  ValiderMesureEnAttente,
  EditService
} from "./modals";

class MandataireIndex extends React.Component {
  componentDidMount() {
    // TODO: temp hack to trigger profile load
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    // define the content of the tabs
    return (
      <React.Fragment>
        {this.props.currentMandataire.type === "service" ? <ServiceTabs /> : <MandataireTabs />}
        <EditMesure />
        <CloseMesure />
        <ReactivateMesure />
        <EditMandataire />
        <ValiderMesureEnAttente />
        <EditService />
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

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onMount: mandataireMount }, dispatch);

// connect to redux store actions
// connect to redux-modal
const MandataireTabsRedux = connect(
  state => ({
    currentMandataire: state.mandataire.profile
  }),
  mapDispatchToProps
)(MandataireIndex);

const Mandataires = () => (
  <Provider store={store}>
    <MandataireTabsRedux />
  </Provider>
);

export default Mandataires;
