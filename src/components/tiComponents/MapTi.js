import React, { createRef } from "react";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

//Redux
import { connect } from "react-redux";

import FilterMesuresMap from "./FilterMesuresMap";
import DisplayMandataires from "./DisplayMandataires";
import FilterByCodePostal from "./FilterByCodePostal";
import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import { filterDataForMandataires } from "../index";
import FiltersMandataireTableMap from "./FilterMandataires";


const Attribution = () => (
  <TileLayer
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  />
);

const MapTi = (
  innerRef,
  center,
  zoom,
  isMandataire,
  dataShow,
  circleSelected,
  mesureCount,
  filteredData,
  unselectMarker,
  selectMarker
) => (
  <React.Fragment>
    <div style={{ display: "flex" }}>
      <FilterMesuresMap
        zoomCodePostal={this.zoomCodePostal}
        updateValue={this.updateValue}
        value={this.state.value}
        style={{ zIndex: "1000", flex: "1" }}
      />
      <FilterByCodePostal
        render={({ value, updateValue }) => {
          return <FilterMesuresMap value={value} updateValue={updateValue} />;
        }}
        style={{ zIndex: "1000", flex: "1" }}
      />
    </div>
    <div
      style={{
        display: "flex"
      }}
    >
      <div style={{ flex: "1" }}>
        <Map
          center={center}
          zoom={zoom}
          style={{ width: "100%", height: "68vh", padding: 0 }}
          ref={innerRef}
          onMoveend={() => this.handleMoveend(this.mapRef)}
        >
          <Attribution />
          {dataShow &&
            dataShow.map &&
            dataShow.map((marker, i) => {
              const isSelected = isMandataire
                ? circleSelected.id === marker.id
                : circleSelected.code_postal === marker.code_postal;
              const onClick = isSelected ? unselectMarker : selectMarker;
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
        <DisplayMandataires mesureCount={mesureCount} filteredData={filteredData} />
      </div>
    </div>
  </React.Fragment>
);

export default MapTi;
