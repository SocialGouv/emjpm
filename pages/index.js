import fetch from "isomorphic-fetch";
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
import FormulaireMandataire from "../src/components/formulaire_mandataire";
require("leaflet/dist/leaflet.css");
import App from "./index";
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";

import Router from "next/router";

import MandatairesIndex from "./mandataires_index";
import Form from "react-jsonschema-form";
import { redirectIfAuthenticated } from "../lib/auth";
import axios from "axios";

// import {
//     // BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter
// } from 'react-router-dom'
import LoginIndex from "./login";

class Index extends React.Component {
  state = {
    datamesure: "",
    error: false,
    history: "",
    redirectToReferrer: false
  };

  componentWillMount() {
    // if (isServer) {
    //     // Server-side on first render
    //     const loggedInUser = _.get(req, 'session.passport.user.username');
    //     return { loggedInUser };
    // }
    // else {
    //     // Client-side on following renders
    //     return window.__NEXT_DATA__.props.initialProps;
    // }
    const urlmesure = "http://localhost:3005/api/v1/loginIn";

    fetch(urlmesure, {
      credentials: "include",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          datamesure: json,
          redirectToReferrer: true
        });
      });
  }

  // componentWillMount() {
  //     const urlmesure = "http://localhost:3005/api/v1/loginIn";
  //     fetch(urlmesure)
  //         .then(response => {
  //         if (response) {
  //             response.json()
  //         } else
  //         {
  //             Router.push('/login')
  //         }
  //
  //         })
  //         .then(json => {
  //             if (json === "success"){
  //                 this.setState({
  //                     datamesure: json,
  //                     redirectToReferrer: true
  //               })
  //                 }
  //             })
  // }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/tis' } }
    const { redirectToReferrer } = this.state;

    // if (redirectToReferrer === true) {
    //     <Redirect to={from} />
    // }
    // else {
    //     <Redirect to={{
    //         pathname: '/login',
    //         state: { from: props.location }
    //     }} />

    return (
      <div> </div>
      // <Router>
      //     <div>
      //         {/*<ul>*/}
      //         {/*<li><Link to="/public">Public Page</Link></li>*/}
      //         {/*<li><Link to="/protected">Protected Page</Link></li>*/}
      //         {/*</ul>*/}
      //         <Route path='/login' component={LoginIndex} />
      //         <PrivateRoute path='/manataire_index' component={MandatairesIndex} />
      //         <PrivateRoute path='/tis' component={App} />
      //     </div>
      // </Router>
    );
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         Index.state.redirectToReferrer === true
//             ? <Component {...props} />
//             : <Redirect to={{
//                 pathname: '/login',
//                 state: { from: props.location }
//             }} />
//     )} />
// )

export default Index;
