import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EstablishmentsService from '../../services/establishments';
import Establishment from '../Establishment';

const MapContainer = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        setCurrentLocation();
        loadCoffeShops();
    }, [])

    async function setCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <div>
            <LoadScript googleMapsApiKey='AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w'>
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker key={item.name} 
                                    position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                                    onClick={() => setSelected(item)}
                                />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>

            {
                selected.photos && 
                (
                    <>
                        <Establishment establishment={selected} />
                    </>
                )
            }
        </div>
    )
}

export default MapContainer;