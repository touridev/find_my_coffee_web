import React, { useState } from 'react';
import { Column } from 'rbx';

import RatingService from '../../services/rating';

import Rating from '@material-ui/lab/Rating';

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
            value: (value == null) ? 1 : value,
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
                        <Rating
                        name="controlled"
                        value={value} 
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }} />
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