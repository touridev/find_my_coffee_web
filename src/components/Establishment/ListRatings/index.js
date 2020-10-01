import React, { useEffect, useState } from 'react';

import { Column } from 'rbx';

import RatingService from '../../../services/rating';

import Rating from '@material-ui/lab/Rating';

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

                    <Rating name="read-only" 
                            className="m-top"
                            value={
                                (ratingsList.ratings_count) > 0 ?
                                ratingsList.ratings_average : 0
                            } readOnly />
                </Column.Group>

                <hr />
            </div>
            
            {
                ratingsList.ratings &&
                <div className="listing_opinions">
                    {
                        ratingsList.ratings.map(rating => {
                            return (
                                <div key={rating.id}>
                                    <Column.Group>
                                        <Column>
                                            <b>{ rating.user_name }</b>
                                        </Column>

                                        <Column>
                                            <Rating name="read-only" 
                                                    value={
                                                        (rating.value) > 0 ?
                                                        rating.value : 0
                                                    } readOnly />
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
            }
        </>
    )
}

export default ListRatings;