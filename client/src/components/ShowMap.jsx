import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ShowMap.css"
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

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
        iconUrl: import.meta.env.BASE_URL + 'location.png',
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
                        marker.latitude && marker.longitude && (
                            <Marker position={[marker.latitude, marker.longitude]} icon={customIcon} key={index}>
                                <Popup>
                                    <Link to={`/turfs/${marker._id}`}><h2 style={{marginBottom: '5px', color: 'blue'}}>{marker.name}</h2></Link>
                                    {marker.rating ? <Rating value={marker.rating} precision={0.5} readOnly /> : <Rating value={0} readOnly />}
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