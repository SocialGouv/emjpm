import React, { createRef } from "react";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import apiFetch from "../communComponents/Api";

export const MapsView = ({ mesures, zoom, center, width, height, onMoveend, innerRef }) => (
  <div className="container">
    {" "}
    <div className="row">
      <Map
        center={center}
        zoom={zoom}
        style={{ width, height }}
        onMoveend={onMoveend}
        ref={innerRef}
      >
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {mesures &&
          mesures.map(manda => (
            <Marker position={[manda.latitude, manda.longitude]}>
              <Popup>
                <div>
                  {manda.array_agg.map(arrayMaps => (
                    <div>
                      {arrayMaps} <br />
                    </div>
                  ))}
                  <br />
                </div>
              </Popup>
            </Marker>
          ))}
        ;
      </Map>
    </div>
  </div>
);

class Mapstry extends React.Component {
  state = {
    zoom: 10,
    datamesure: "",
    value: ""
  };

  mapRef = createRef();

  componentDidMount() {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    })
      .then(mesures => {
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireMesures(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleMoveend = () => {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    })
      .then(mesures => {
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireMesures(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  };

  zoomCodePostal = codePostal => {
    if (!codePostal || !codePostal.trim()) {
      return Promise.resolve(null);
    }
    apiFetch("/mandataires/PosteCode", {
      method: "POST",
      body: JSON.stringify({
        codePoste: codePostal
      })
    })
      .then(mesures => {
        this.props.updatePostCodeMandataires(mesures);
        this.setState({ zoom: 13 });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getPostCodeCoordinates = commune => {
    // return null if no input
    if (!commune || !commune.trim()) {
      return Promise.resolve(null);
    }
    return fetch(`https://api-adresse.data.gouv.fr/search/?q=${commune}`)
      .then(response => response.json())
      .then(json =>
        this.props.updatePostCodeMandatairesByCommune(json.features[0].geometry.coordinates)
      );
    // .then(json => json);
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
        openModal={this.props.openModal}
        filteredMesures={this.props.filteredMesures}
        mesureCount={this.props.mesureCount}
        updateFilters={this.props.updateFilters}
        zoomCodePostal={this.zoomCodePostal}
        getPostCodeCoordinates={this.getPostCodeCoordinates}
        updateValue={this.props.updateValue}
        value={this.props.value}
      />
    );
  }
}

export default Mapstry;
