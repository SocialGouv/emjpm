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

import { Map, Marker, Popup, TileLayer } from "react-leaflet";

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
    zoom: 10
  };

  render() {
    const center = this.props.postcodeMandataire
      ? [this.props.postcodeMandataire[1], this.props.postcodeMandataire[0]]
      : [50.459441, 2.693963];
    return (
      <div>
        <Map center={center} zoom={this.state.zoom}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.props.mesure &&
            this.props.mesure.map(manda => (
              <Marker
                key={manda.id}
                position={[manda.latitude, manda.longitude]}
                style={{ backgroundColor: "black" }}
              >
                <Popup>
                  <span>
                    {manda.nom} <br />
                    {manda.prenom} <br />
                    {manda.type} <br />
                    {/*{manda.date_ouverture} <br />*/}
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
