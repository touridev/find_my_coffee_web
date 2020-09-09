import React, { useState, useEffect } from 'react';
import EstablishmentPhotoService from '../../services/establishment_photo';

import './style.css';

const Establishment = (props) => {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        loadPhoto();
        console.log(props);
    }, [])
    
    async function loadPhoto() {
        const response = await EstablishmentPhotoService.index(props.establishment.photos[0].photo_reference);
        setPhoto(response.data);
    }

    return (
        <div className="left-bar">
            testeeeee
        </div>
    )
}

export default Establishment;