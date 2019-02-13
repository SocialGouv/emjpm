import fetch from "isomorphic-fetch";
import PropTypes from "prop-types";
import Modal from "react-modal";
import geolib from "geolib";
import TableMesure from "../src/components/TableMesure";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";
import ImageBandeau from "../src/components/ImageBandeau";
import PanelGrisMandataire from "../src/components/PanelGrisMandataire";
import Footer from "../src/components/Footer";
import Commentaire from "../src/components/Commentaire";
import dynamic from "next/dynamic";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
require("leaflet/dist/leaflet.css");
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../node_modules/react-tabs/style/react-tabs.css";
import App from "./index";
// import { redirectIfNotAuthenticated, getJwt } from "../lib/auth";
// import { getUser, getCurrentUser } from "../services/userApi";
// import {
//     BrowserRouter as Router,
//     Route,
//     Redirect,
//     withRouter
// } from "react-router-dom";

import AppLogin from "./login";
import apiFetch from "../src/components/Api";
import FooterBottom from "../src/components/FooterBottom"
import Router from "next/router";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const MapSearchMesures = dynamic(import("../src/components/MapMesures"), {
  ssr: false,
  loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});
const API_URL = process.env.API_URL;

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };
  // static async getInitialProps(ctx) {
  //
  //     console.log(222)
  //     // If it does not exist session, it gets redirected
  //     if (redirectIfNotAuthenticated(ctx)) {
  //         return {};
  //     }
  //     //
  //     // const id = ctx.query && ctx.query.id;
  //     // const jwt = getJwt(ctx);
  //     // const res = await (id ? getUser(jwt, id) : getCurrentUser(jwt));
  //     // // const res = await (id ? getUser(jwt, id) : getCurrentUser(jwt));
  //     // return {
  //     //     user: res.data,
  //     //     authenticated: !!jwt,
  //     //     query: !!id
  //     // };
  // }

  componentDidMount() {



      apiFetch(`/mandataires/1/mesures`,)
          .then(json => {
              this.setState({
                  datamesure: json
              });
          });


      apiFetch(`/mandataires/1`,)
          .then(json => {
              this.setState({
                  currentMandataire: json
              });
          });
  }

    onlogout = () => {
        fetch(`${API_URL}/auth/logout`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }})
            .then(response => response.json())
            .then(json => {
                Router.push("/login");
            });
    };

    updateMesure = mesures => {
        this.setState({datamesure: mesures })
    };

    updateMadataire = mesures => {
        this.setState({currentMandataire: mesures })
    };

  render() {
      console.log(this.state.datamesure)
    const filteredMesures = this.state.datamesure;
    return (
      <div>
          <div style={{textAlign: "right", paddingRight: "20px"}}>
              <button type="submit" className="btn btn-linkt" onClick={this.onlogout}>Logout</button>
          </div>
          <Navigation  />
        <Tabs>
          <TabList>
            <div
              className="panel"
              style={{
                textAlign: "left",
                backgroundSize: "cover",
                heigth: "100px !important",
                backgroundColor: "#cccccc"
              }}
            >
              <div className="panel__container" style={{ paddingBottom: "0px" }}>
                <div className="container" style={{ paddingRight: "27px", paddingLeft: "27px" }}>
                  <h2 style={{ color: "black" }}> {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom} </h2>
                  <Tab>Mesures en cours</Tab>
                  <Tab>Vos informations</Tab>
                </div>
              </div>
            </div>
          </TabList>
          <div className="container">
            <TabPanel>
              <TableMesure rows={filteredMesures} updateMesure={ this.updateMesure }/>
            </TabPanel>
            <TabPanel>
              <FormulaireMandataire currentMandataireModal={this.state.currentMandataire} updateMadataire={this.updateMadataire} />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

const Apprender = () => (
    <div style={styles}>


        <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
            <MandatairesIndex />
        </div>
        <div style={{ overflowY: "auto", maxHeight: "20vh" }}>
            <FooterBottom />
        </div>

    </div>
);

export default Apprender;


// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             fakeAuth.isAuthenticated === true ? (
//                 <Component {...props} />
//             ) : (
//                 <Redirect
//                     to={{
//                         pathname: "/login",
//                         state: { from: props.location }
//                     }}
//                 />
//             )
//         }
//     />
// );

// const AuthButton = withRouter(({ history }) => (
//     fakeAuth.isAuthenticated ? (
//         <p>
//             Welcome! <button onClick={() => {
//             fakeAuth.signout(() => history.push('/'))
//         }}>Sign out</button>
//         </p>
//     ) : (
//         <p>You are not logged in.</p>
//     )
// ))

// export default function AuthExample() {
//     return (
//         {/*<Router>*/}
//             {/*<div>*/}
//                 {/*/!*<AuthButton/>*!/*/}
//                 {/*/!*<ul>*!/*/}
//                 {/*/!*<li><Link to="/public">Public Page</Link></li>*!/*/}
//                 {/*/!*<li><Link to="/protected">Protected Page</Link></li>*!/*/}
//                 {/*/!*</ul>*!/*/}
//                 {/*<Route path="/login" component={AppLogin} />*/}
//                 {/*<PrivateRoute path="/manataire_index" component={MandatairesIndex} />*/}
//             {/*</div>*/}
//         {/*</Router>*/}
//     );
// }
