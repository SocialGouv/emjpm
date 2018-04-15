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

import { Map, Marker, Popup,CircleMarker, TileLayer, PropTypes as MapPropTypes } from "react-leaflet";
import "../../static/css/custom.css";
import CodePostalMandataire from "./CodePostalMandataire";

// const MyPopupMarker = ({ children, position }) => (
//     <Marker position={position}>
//         <Popup>
//             <span>{children}</span>
//         </Popup>
//     </Marker>
// );
// MyPopupMarker.propTypes = {
//     children: MapPropTypes.children,
//     position: MapPropTypes.latlng
// };
//
// const MyMarkersList = ({ markers }) => {
//     const items = markers.map(({ key, ...props }) => (
//         <MyPopupMarker key={key} {...props} />
//     ));
//     return <div style={{ display: "none" }}>{items}</div>;
// };
// MyMarkersList.propTypes = {
//     markers: PropTypes.array.isRequired
// };

class Mapstry extends React.Component {
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
        <Map
          center={[
            this.props.postcodeMandataire[1] || 50.633,
            this.props.postcodeMandataire[0] || 3.066
          ]}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.props.mesure &&
            this.props.mesure.map(manda => (
              <Marker
                key={manda.latitude}
                position={[manda.latitude, manda.longitude]}
                style={{ backgroundColor: "black" }}
              >
                <Popup>
                  <span>
                    {manda.nom} <br />
                      {manda.prenom} <br />
                    {manda.type} <br />
                    {manda.date_ouverture} <br />
                  </span>
                </Popup>
              </Marker>
            ))};
        </Map>
      </div>
    );
  }
}

export default Mapstry;

{
  /*<Map center={center} zoom={this.state.zoom}>*/
}
{
  /*<TileLayer*/
}
{
  /*attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"*/
}
{
  /*url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/
}
{
  /*/>*/
}
{
  /*<MyMarkersList markers={markers} />*/
}
{
  /*</Map>*/
}
