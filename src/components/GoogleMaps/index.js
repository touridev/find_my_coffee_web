import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentService from '../../services/Google/establishment';
import EstablishmentsService from '../../services/Google/establishments';
import RatingService from '../../services/Local/rating';

import Establishment from '../Establishment';
import NearstCoffees from '../NearstCoffees';

const MapContainer = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);
    const [ratings, setRatings] = useState([]);

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        setCurrentLocation();
        loadCoffeShops();
    }, []);

    useEffect(() => {
        loadRatings();
    }, [selected])

    async function setCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }

    // Load informations of a establishment clicking on it
    async function getEstablishmentInformations(place_id) {
        // Clear ratings
        setRatings([]);

        const response = await EstablishmentService.index(place_id);
        setSelected(response.data.result);
    }

    // Load Establishment Ratings
    async function loadRatings() {
        const response = await RatingService.show(selected.place_id);
        setRatings(response.data);
    }
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <div className="map">
            <LoadScript googleMapsApiKey='AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={(selected.geometry) ? '' : defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker key={item.name} 
                                    position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                                    onClick={() => getEstablishmentInformations(item.place_id)}
                                />
                            )
                        })
                    }

                    {
                        selected.place_id && 
                            (
                                <>
                                    <Establishment place={selected} ratings={ratings} />
                                </>
                            )
                    }

                    <NearstCoffees latitude={latitude} longitude={longitude} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default MapContainer;