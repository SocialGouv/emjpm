// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
//
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
//
//
// const MyMapComponent = compose(
//     withProps({
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
//
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// )

import { Map, Marker, Popup, TileLayer, PropTypes as MapPropTypes } from "react-leaflet";

class MapMesures extends React.Component {
  state = {
    zoom: 13
  };
  render() {
    //
    // const markers = [
    //     { key: 'marker1', position: [51.5, -0.1], children: 'My first popup' },
    //     { key: 'marker2', position: [51.51, -0.1], children: 'My second popup' },
    //     { key: 'marker3', position: [51.49, -0.05], children: 'My third popup' },
    // ]

    return (
      <div>
        <Map center={[50.633, 3.066]} zoom={this.state.zoom}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.props.mesure &&
            this.props.mesure.map(manda => (
              <Marker
                key={manda.geometry.coordinates[0]}
                position={[manda.geometry.coordinates[1], manda.geometry.coordinates[0]]}
                style={{ backgroundColor: "black" }}
              />
            ))};
        </Map>
      </div>
    );
  }
}
