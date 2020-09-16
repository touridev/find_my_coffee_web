import React, { useEffect, useState } from 'react';
import StarYellow from '../../../assets/star_yellow.png';

import './style.css';

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        setRatings(props.ratings.ratings);

        console.log(props.ratings.ratings);
    }, [props]);

    return (
        <div className="listing_opinions">
            {
                ratings &&
                ratings.map(rating => {
                    return (
                        <div key={rating.id}>
                            <div>
                                <b>{ rating.user_name }</b>

                                {
                                    [...Array(rating.value)].map((key, index) => {
                                        return (
                                            <img src={StarYellow} className="right rating_star" key={index} alt="star yellow" />
                                        )
                                    })
                                }
                            </div>

                            { rating.opinion }
                            
                            <p>
                                { rating.date }
                            </p>

                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListRatings;