import React, { useEffect, useState } from 'react';

import { Column } from 'rbx';

import RatingService from '../../../services/Local/rating.js';

import ListStars from '../../ListStars';

import './style.css';

const ListRatings = (props) => {
    const [ratingsList, setRatingsList] = useState([]);

    useEffect(() => {
        loadRatings();
    }, [props]);

    // Load Establishment Ratings
    async function loadRatings() {
        try {
            const response = await RatingService.show(props.place_id);
            setRatingsList(response.data);
        } catch (error) {
            setRatingsList([]);
            console.log(error);
        }
    }

    return (
        <>
            <div className="opinions">
                <Column.Group>
                    <Column>
                        { 
                            (ratingsList.ratings_count > 0) ? ratingsList.ratings_count : 0 
                        } Opiniões 
                    </Column>

                    <ListStars count={ratingsList.ratings_count} average={ratingsList.ratings_average} />
                </Column.Group>

                <hr />
            </div>
            
            <div className="listing_opinions">
                {
                    ratingsList.ratings &&
                    ratingsList.ratings.map(rating => {
                        return (
                            <div key={rating.id}>
                                <Column.Group>
                                    <Column>
                                        <b>{ rating.user_name }</b>
                                    </Column>

                                    <ListStars count={rating.value} average={rating.value} />
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
        </>
    )
}

export default ListRatings;