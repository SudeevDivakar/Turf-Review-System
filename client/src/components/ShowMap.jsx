import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ShowMap.css"
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function ShowMap() {

    //Adjust zoom and center values as per need (Values Specified: India)
    const center = [20.5937, 78.9629];          //Adjusts where the map will be centered 
    const zoom = 4.5;                  //Adjusts how zoomed in the map is 

    const markers = [
        {
            geocode: [12.975343, 77.713091],
            popUp: "Powerplay 1"
        },
        {
            geocode: [12.980936, 77.713965],
            popUp: "Powerplay 2"
        },
        {
            geocode: [12.947045, 77.718810],
            popUp: "MKR sports arena"
        },
    ]

    const customIcon = new Icon({
        iconUrl: import.meta.env.BASE_URL + 'pin.png',
        iconSize: [38, 38]
    })

    return (
        <div>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={4.5}
            >
                <TileLayer
                    url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                />
                <MarkerClusterGroup
                    chunkedLoading
                >
                    {markers.map((marker,index) => (
                        <Marker position={marker.geocode} icon={customIcon} key={index}>
                            <Popup>
                                <h3>{marker.popUp}</h3>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}