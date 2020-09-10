import React, { useState } from 'react';

import './style.css';

const Form = () => {
    const [name, setName] = useState();
    const [message, setMessage] = useState();

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(name);
        console.log(message);

        setName('');
        setMessage('');
    }

    return (
        <div>
            <b>Deixe sua Opinião</b>

            <form onSubmit={handleSubmit}>
                <input name="name" 
                       type="text" 
                       className="input" 
                       placeholder="Seu nome" 
                       onChange={(e) => setName(e.target.value)}
                       value={name}/>

                <textarea name="message" 
                          className="textarea"  
                          placeholder="Sua opinião"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}></textarea>

                <input type="submit" value="Enviar" className="button is-danger" />
            </form>

        </div>
    )
}

export default Form;