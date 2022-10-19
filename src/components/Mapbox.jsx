import Map, {Marker}  from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Mapbox({lng, lat}) {
  return (
    <Map
        initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 8
        }}
        style={{width: '100%', height: '40em'}}
        mapboxAccessToken={process.env.REACT_APP_MAP_API_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        projection= 'globe'
        >
        <Marker longitude={lng} latitude={lat} anchor="bottom" color='black'>
        </Marker>
    </Map>
  )
}

export default Mapbox