import { connect } from "react-redux";
import * as React from "react";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

import FilterMesuresMap from "./FilterMesuresMap";
import FiltersMandataireTableMap from "./FilterMandataires";
import DisplayMandataires from "./DisplayMandataires";


const Attribution = () => (
  <TileLayer
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  />
);

class TiMap extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <FilterMesuresMap
            zoomCodePostal={this.props.zoomCodePostal}
            updateValue={this.props.updateValue}
            value={this.props.value}
            style={{ zIndex: "1000", flex: "1" }}
          />
          <FiltersMandataireTableMap
            isMandataire={this.props.isMandataire}
            style={{ zIndex: "9999", flex: "1" }}
          />
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <div style={{ flex: "1" }}>
            <Map
              center={this.props.center}
              zoom={this.props.zoom}
              style={{ width: "100%", height: "68vh", padding: 0 }}
              ref={this.props.mapRef}
              onMoveend={() => this.props.handleMoveend(this.props.mapRef)}
            >
              <Attribution />
              {this.props.dataShow &&
                this.props.dataShow.map &&
                this.props.dataShow.map((marker, i) => {
                  const isSelected = this.props.isMandataire
                    ? this.props.circleSelected.id === marker.id
                    : this.props.circleSelected.code_postal === marker.code_postal;
                  const onClick = isSelected ? this.props.unselectMarker : this.props.selectMarker;
                  const markerColor = isSelected ? "blue" : "red";
                  return (
                    <CircleMarker
                      key={marker.id + "-" + i}
                      center={[marker.latitude, marker.longitude]}
                      color={markerColor}
                      radius={10}
                      onClick={() => onClick(marker)}
                    />
                  );
                })}
            </Map>
          </div>
          <div style={{ flex: "1" }}>
            <DisplayMandataires
              mesureCount={this.props.mesureCount}
              filteredData={this.props.filteredData}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TiMap;
