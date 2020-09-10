import React, { useEffect } from 'react';

import './style.css';

const Establishment = (props) => {
    
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className="left-bar">
            <div className="about">
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.establishment.photos[0].photo_reference}&sensor=false&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`} />

                <br />
                
                <h3>{props.establishment.name}</h3>

                <br />
                
                <p>
                    {props.establishment.formatted_address}
                </p>

                <hr />

                <span>
                    2 Opiniões
                </span>
            </div>

        </div>
    )
}

export default Establishment;