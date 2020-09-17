import React from 'react';
import { Column } from 'rbx';

import Form from '../Form';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';
import StarYellow from '../../assets/star_yellow.png';
import StarGray from '../../assets/star.png';

import ListRatings from './ListRatings';

import './style.css';

const Establishment = (props) => {
    return (
        <div className="left-bar">
            <div className="about">
                {
                    (props.place.photos) ? 
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.place.photos[0].photo_reference}&sensor=false&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`} alt="Store perfil"/> 
                    :  
                        <img src={ProfilePhoto} alt="No perfil" />
                }

                <br />
                
                <h3>{props.place.name}</h3>

                <br />

                {
                    (props.place.opening_hours) ? 
                        <> 
                            { 
                                (props.place.opening_hours.open_now === true) ? 'Aberto' : 'Fechado' 
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
                    <Column.Group>
                        <Column>
                            { 
                                (props.ratings.ratings_count > 0) ? props.ratings.ratings_count : 0 
                            } Opiniões 
                        </Column>

                        <Column>
                            {
                                props.ratings.ratings_count > 0 &&
                                (
                                    [...Array(props.ratings.ratings_average)].map((i) => <img src={StarYellow} className="rating_star" alt="star yellow" />)
                                )
                            }

                            {
                                props.ratings.ratings_count > 0 &&
                                (
                                    [...Array(5 - props.ratings.ratings_average)].map((i) => <img src={StarGray} className="rating_star" alt="star gray" />)
                                )
                            }
                        </Column>
                    </Column.Group>

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