import Map, {Marker, Popup}  from 'react-map-gl';

function Mapbox({lng, lat}) {
  return (
    <Map
        initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 8
        }}
        style={{width: '100%', height: '300px'}}
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