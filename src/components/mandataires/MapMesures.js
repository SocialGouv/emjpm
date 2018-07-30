import React from "react";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import DataLoader from "./DataLoader";

const Attribution = () => (
  <TileLayer
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  />
);

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
  <DataLoader
    getPromise={getPromise}
    render={({ data }) => (
      <Map center={center} zoom={9} style={{ width: "100%", height: "70vh", padding: 0 }}>
        <Attribution />
        {data && data.map(marker => <MesureMarker key={marker.id} {...marker} />)}
        ;
      </Map>
    )}
  />
);

const mapStateToProps = state => ({
  center: (state.mandataire &&
    state.mandataire.profile &&
    state.mandataire.profile.latitude && [
      state.mandataire.profile.latitude,
      state.mandataire.profile.longitude
    ]) || [0, 0]
});

export default connect(mapStateToProps)(MapMesures);
