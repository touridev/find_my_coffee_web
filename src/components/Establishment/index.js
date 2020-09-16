import React, { useEffect, useState } from 'react';
import Form from '../Form';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';
import StarYellow from '../../assets/star_yellow.png';

import ListRatings from './ListRatings';

import './style.css';

const Establishment = (props) => {

    useEffect(() => {
        console.log(props.ratings);
    }, [props.ratings]);

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
                        <> 
                            { 
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
                
                <div className="opinions">
                    <span>
                        { 
                            (props.ratings.ratings_count > 0) ? props.ratings.ratings_count : 0 
                        } Opiniões 

                        {
                            props.ratings.ratings_count > 0 &&
                            (
                                [...Array(props.ratings.ratings_average)].map((i) => <img src={StarYellow} className="rating_star right" alt="star yellow" />)
                            )
                        }
                    </span>

                    <hr />
                    
                    {
                        props.ratings.ratings_count > 0 &&
                        (
                            <ListRatings ratings={props.ratings} />
                        )
                    }
                </div>

                <Form store={props} />
            </div>

        </div>
    )
}

export default Establishment;