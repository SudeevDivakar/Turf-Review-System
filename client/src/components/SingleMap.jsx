import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Rating } from "@mui/material";


export default function SingleMap({ turf }) {

    const customIcon = new Icon({
        iconUrl: import.meta.env.BASE_URL + 'pin.png',
        iconSize: [38, 38]
    });
    
    return (
        <div style={{ height: 'inherit'}}>
            <MapContainer
                style={{ height: 'inherit'}}
                center={[20.5937, 78.9629]}        //Adjusts where the map will be centered
                zoom={4}          //Adjusts how zoomed in the map is
            >
                <TileLayer
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup chunkedLoading>
                    {turf.geoCode && turf.geoCode.length > 0 && (
                        <Marker position={turf.geoCode} icon={customIcon}>
                            <Popup>
                                <h2 style={{ marginBottom: '5px' }}>{turf.name}</h2>
                                {turf.rating ? <Rating value={turf.rating} readOnly /> : <Rating value={0} readOnly />}
                                <p style={{ marginTop: '5px' }}>{turf.location}</p>
                            </Popup>
                        </Marker>
                    )}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}