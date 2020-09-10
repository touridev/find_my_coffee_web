import React, { useEffect } from 'react';
import Form from '../Form';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';

import './style.css';

const Establishment = (props) => {

    useEffect(() => {
        console.log(props);
    })

    return (
        <div className="left-bar">
            <div className="about">
                {
                    (props.place.photos) ? 
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.place.photos[0].photo_reference}&sensor=false&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`} alt="Store perfil photo"/> 
                    :  
                        <img src={ProfilePhoto} alt="No perfil photo" />
                }

                <br />
                
                <h3>{props.place.name}</h3>

                <br />

                {
                    (props.place.opening_hours) ? 
                        <> { 
                                (props.place.opening_hours.open_now == true) ? 'Aberto' : 'Fechado' 
                            } 

                            <hr />

                            {
                                props.place.opening_hours.weekday_text.map(schedule => {
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
                    {props.place.formatted_address}
                </p>

                <hr />

                <span>
                    2 Opiniões
                </span>

                <Form />
            </div>

        </div>
    )
}

export default Establishment;