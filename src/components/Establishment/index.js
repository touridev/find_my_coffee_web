import React, { useEffect, useState } from 'react';

import Form from '../Form';
import ListRatings from './ListRatings';

import EstablishmentService from '../../services/google_establishment';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';

import './style.css';

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState([]);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);


    async function getEstablishmentInformations() {
        try {
            const response = await EstablishmentService.index(props.place.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
            console.log(error);
        }
    }

    return (
        <div className="left-bar">
            <div className="about">
                {
                    (establishment.photos) ? 
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=YOUR_SECRET_KEY`} alt="Store perfil"/> 
                    :  
                        <img src={ProfilePhoto} alt="No perfil" />
                }

                <br />
                
                <h3>{establishment.name}</h3>

                <br />

                {
                    (establishment.opening_hours) ? 
                        <> 
                            { 
                                (establishment.opening_hours.open_now === true) ? 'Aberto' : 'Fechado' 
                            } 

                            <hr />

                            {
                                establishment.opening_hours.weekday_text.map(schedule => {
                                    return (
                                        <p key={schedule}>{schedule}</p>
                                    )
                                })
                            }   
                        </> 
                    : 
                        'Não há cadastros de horário de funcionamento.'
                }

                <hr />

                <p>
                    {establishment.formatted_address}
                </p>

                <hr />
                
                <ListRatings place_id={props.place.place_id} />

                <Form place={props.place} />
            </div>
        </div>
    )
}

export default Establishment;
