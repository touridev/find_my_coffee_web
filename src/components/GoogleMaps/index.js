import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [ selected, setSelected ] = useState({});

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, [])

    const onSelect = item => {
        setSelected(item);
    }

    const locations = [
        {
          name: "Location 1",
          location: { 
            lat: -21.7370416,
            lng: -41.3528326 
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: -21.7470416,
            lng: -41.3428326 
          },
        },
        {
          name: "Location 3",
          location: { 
            lat: -21.7380416,
            lng: -41.3538326 
          },
        },
        {
          name: "Location 4",
          location: { 
            lat: -21.7580416,
            lng: -41.3738326
          },
        }
      ];
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <LoadScript googleMapsApiKey='AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w'>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}>
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name} 
                                position={item.location}
                                onClick={() => onSelect(item)}
                            />
                        )
                    })
                }

                {
                    selected.location && 
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;