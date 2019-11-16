import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { connect } from "react-redux";

import LoadingMessage from "../common/LoadingMessage";
import Resolve from "../common/Resolve";

const Attribution = () => (
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
  />
);

// todo: better display
const MesureMarker = ({ id, latitude, longitude, array_agg }) => (
  <Marker key={id} position={[latitude, longitude]}>
    <Popup>
      <div>
        {array_agg &&
          array_agg.map((arrayMaps, i) => (
            <div key={i}>
              {arrayMaps} <br />
            </div>
          ))}
      </div>
    </Popup>
  </Marker>
);

const MapMesures = ({ getPromise, center = [48.866667, 2.333333] }) => (
  <Resolve
    promises={[() => getPromise()]}
    render={({ status, result }) => (
      <React.Fragment>
        {status === "success" && (
          <Map center={center} zoom={9} style={{ height: "70vh", padding: 0, width: "100%" }}>
            <Attribution />
            {result[0] &&
              result[0].map((marker, i) => <MesureMarker key={marker.id + "" + i} {...marker} />)}
          </Map>
        )}
        {status === "error" && <div>Impossible de charger la carte des mesures</div>}
        {status === "loading" && <LoadingMessage />}
      </React.Fragment>
    )}
  />
);

const mapStateToProps = state => ({
  center: (state.mandataire &&
    state.mandataire.profiles &&
    state.mandataire.profiles.latitude && [
      state.mandataire.profiles.latitude,
      state.mandataire.profiles.longitude
    ]) || [0, 0]
});

export default connect(mapStateToProps)(MapMesures);
