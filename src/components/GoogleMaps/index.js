import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentsService from '../../services/google_list_of_establishments';

import Establishment from '../Establishment';
import NearstCoffees from '../NearstCoffees';

const GoogleMaps = () => {
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
    }, []);

    useEffect(() => {
        loadCoffeShops();
    }, [longitude])

    async function setCurrentLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } catch (error) {
            alert('Habilite a localização para utilizar o aplicativo!');
        }
    }

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <div className="map">
            <LoadScript googleMapsApiKey='YOUR_SECRET_KEY'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={(selected.geometry) ? '' : defaultCenter}>
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

                    {
                        selected.place_id && 
                            (
                                <Establishment place={selected} />
                            )
                    }

                    <NearstCoffees latitude={latitude} longitude={longitude} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMaps;
