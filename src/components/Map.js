import React, { createRef, Component } from "react";
import { Map, Marker, Popup, CircleMarker, Circle, TileLayer, Tooltip } from "react-leaflet";
import apiFetch from "./Api";
import TableMandataire from "./TableMandataire";

var Hellomap = (center, zoom, style) => {
  Map.map("map", {
    center,
    zoom,
    style
  });
};

export const MapsView = ({
  mesures,
  zoom,
  center,
  width,
  height,
  onMoveend,
  innerRef,
  filteredMesures,
  openModal
}) => (
    <div>        < div className="row">
        <div className="col-8">

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
      ))}
    ;

  </Map>
        </div>
            <div className="col-3">
    <TableMandataire rows={filteredMesures} openModal={openModal} />
    </div>
    </div>
    </div>
        );

class Mapstry extends React.Component {
  state = {
    zoom: 10,
    datamesure: ""
  };


    mapRef = createRef();

  componentDidMount() {
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: this.mapRef.current.leafletElement.getBounds()._northEast.lat,
        latSouthWest: this.mapRef.current.leafletElement.getBounds()._southWest.lat,
        longNorthEast: this.mapRef.current.leafletElement.getBounds()._northEast.lng,
        longSouthWest: this.mapRef.current.leafletElement.getBounds()._southWest.lng
      })
    })
      .then(mesures => {
        console.log("API", mesures);
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireMesures(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  }


  handleMoveend = mapRef => {
    console.log(1234);
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
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireMesures(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    console.log(this.props.filteredMesures);
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
        openModal={this.props.openModal}
        filteredMesures={this.props.filteredMesures}
      />
    );
  }
}

export default Mapstry;
