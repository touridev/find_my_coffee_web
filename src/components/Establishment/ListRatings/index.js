import React, { useEffect, useState } from 'react';

import { Column } from 'rbx';

import StarYellow from '../../../assets/star_yellow.png';
import StarGray from '../../../assets/star.png';

import './style.css';

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        setRatings(props.ratings.ratings);
    }, [props]);

    return (
        <div className="listing_opinions">
            {
                ratings &&
                ratings.map(rating => {
                    return (
                        <div key={rating.id}>
                            <Column.Group>
                                <Column>
                                    <b>{ rating.user_name }</b>
                                </Column>

                                <Column>
                                    {
                                        [...Array(rating.value)].map((key, index) => {
                                            return (
                                                <img src={StarYellow} className="rating_star" key={index} alt="star yellow" />
                                            )
                                        })
                                    }

                                    {
                                        [...Array(5 - rating.value)].map((key, index) => {
                                            return (
                                                <img src={StarGray} className="rating_star" key={index} alt="star gray" />
                                            )
                                        })
                                    }
                                </Column>
                            </Column.Group>

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