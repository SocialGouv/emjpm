import React, { createRef, Component } from "react";
import { Map, Marker, Popup, CircleMarker, Circle, TileLayer, Tooltip } from "react-leaflet";
import apiFetch from "./Api";
import TableMandataire from "./tiComponents/TableMandataire";
import styled from "styled-components";
import FilterMesuresMap from "./tiComponents/FilterMesuresMap";
var Hellomap = (center, zoom, style) => {
    Map.map("map", {
        center,
        zoom,
        style
    });
};

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

export const MapsView = ({
                             mesures,
                             zoom,
                             center,
                             width,
                             height,
                             onMoveend,
                             innerRef,
                             filteredMesures,
                             openModal,
                             mesureCount,
                             updateFilters,
                             zoomCodePostal,
                             getPostCodeCoordinates,
                             updateValue,
                             value
                         }) => (
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
        console.log(2);
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
                console.log("heelo", mesures);
                this.props.updatePostCodeMandataires(mesures);
                this.setState({ zoom: 13 });
            })
            .catch(e => {
                console.log(e);
            });
    };


    getPostCodeCoordinates = commune => {
        // return null if no input
        console.log("input", commune)

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
        console.log(this.props.filteredMesures);
        const center = this.props.postcodeMandataire
            ? [this.props.postcodeMandataire[1], this.props.postcodeMandataire[0]]
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
