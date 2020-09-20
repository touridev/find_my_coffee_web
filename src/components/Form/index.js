import React, { useState } from 'react';
import { Column } from 'rbx';

import RatingService from '../../services/Local/rating';

import StarYellow from '../../assets/star_yellow.png';
import StarGray from '../../assets/star.png';

import './style.css';

const Form = (props) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(1);

    async function handleSubmit(e) {
        e.preventDefault();

        const store_params = {
            latitude: props.place.geometry.location.lat,
            longitude: props.place.geometry.location.lng,
            name: props.place.name,
            address: props.place.formatted_address,
            place_id: props.place.place_id
        }

        const rating_params = {
            value: value,
            opinion: message,
            user_name: name
        }

        await RatingService.create(store_params, rating_params);

        setName('');
        setMessage('');
    }

    return (
        <div>
            <br />
            
            <b>Deixe sua Opinião</b>

            <form onSubmit={handleSubmit}>
                <input name="name" 
                       type="text" 
                       className="input" 
                       placeholder="Seu primeiro nome" 
                       onChange={(e) => setName(e.target.value)}
                       value={name}/>

                <textarea name="message" 
                          className="textarea"  
                          placeholder="Sua opinião"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}></textarea>

                <br />

                <Column.Group>
                    <Column className="form_stars">
                        {
                            [...Array(5)].map((key, index) => {
                                return (
                                    <img className="rating_star" 
                                         src={StarGray}
                                         value={index + 1} 
                                         key={index} 
                                         alt="star yellow" 
                                         onMouseOver={e => (e.relatedTarget.src = StarYellow)}
                                         onClick={() => setValue(index + 1)} />
                                )
                            })
                        }
                    </Column>

                    <Column>
                        <input type="submit" value="Enviar" className="button is-danger" />
                    </Column>
                </Column.Group>
            </form>

        </div>
    )
}

export default Form;