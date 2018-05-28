import React, { createRef, Component } from "react";
import { Map, Marker, Popup, CircleMarker, Circle, TileLayer, Tooltip } from "react-leaflet";
import apiFetch from "./Api";

var Hellomap = (center, zoom, style) => {
  Map.map("map", {
    center,
    zoom,
    style
  });
};

export const MapsView = ({ mesures, zoom, center, width, height, onMoveend, innerRef }) => (
  <Map center={center} zoom={zoom} style={{ width, height }} onMoveend={onMoveend} ref={innerRef}>
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    {mesures &&
      mesures.map(manda => (
        <CircleMarker
          center={[manda.latitude, manda.longitude]}
          color="red"
          radius={20}
          fill={manda.count}
          key={manda.latitude}
          placeholder={manda.count}
        >
          <Tooltip> {manda.count}</Tooltip>
        </CircleMarker>
      ))};
  </Map>
);

class Mapstry extends React.Component {
  state = {
    zoom: 10
  };
  mapRef = createRef();

  handleMoveend = mapRef => {
    console.log(1234)
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRef.current.leafletElement.getBounds()._northEast.lat,
        latSouthWest: mapRef.current.leafletElement.getBounds()._southWest.lat,
        longNorthEast: mapRef.current.leafletElement.getBounds()._northEast.lng,
        longSouthWest: mapRef.current.leafletElement.getBounds()._southWest.lng
      })
    })
      .then(mesures => {
        console.log("APImesures", mesures);
        this.props.updateMesures(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const center = this.props.postcodeMandataire
      ? [this.props.postcodeMandataire[0], this.props.postcodeMandataire[1]]
      : [50.459441, 2.693963];
    return (
      <MapsView
        innerRef={this.mapRef}
        zoom={this.state.zoom}
        width={this.props.width}
        height={this.props.height}
        onMoveend={() => this.handleMoveend(this.mapRef)}
        center={center}
        mesures={this.props.mesures}
      />
    );
  }
}

export default Mapstry;
