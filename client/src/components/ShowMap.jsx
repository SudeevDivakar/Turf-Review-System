import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ShowMap.css"
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";

export default function ShowMap() {

    //Adjust zoom and center values as per need (Values Specified: India)
    const center = [20.5937, 78.9629];          //Adjusts where the map will be centered 
    const zoom = 4.5;                  //Adjusts how zoomed in the map is 

    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        async function mapData() {
            const result = await axios.get('http://localhost:3000/turfs/mapData');
            setMarkers(result.data);
        }
        mapData();
    }, []);

    const customIcon = new Icon({
        iconUrl: import.meta.env.BASE_URL + 'pin.png',
        iconSize: [38, 38]
    })

    return (
        <div>
            <MapContainer
                center={center}
                zoom={zoom}
            >
                <TileLayer
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup chunkedLoading>
                    {markers.map((marker, index) => (
                        marker.geoCode && marker.geoCode.length > 0 && (
                            <Marker position={marker.geoCode} icon={customIcon} key={index}>
                                <Popup>
                                    <h2 style={{marginBottom: '5px'}}>{marker.name}</h2>
                                    {marker.rating ? <Rating value={marker.rating} readOnly /> : ''}
                                    <p style={{marginTop: '5px'}}>{marker.location}</p>
                                </Popup>
                            </Marker>
                        )
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}