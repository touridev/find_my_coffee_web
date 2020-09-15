import React, { useEffect, useState } from 'react';

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        setRatings(props.ratings.ratings);

        console.log(props.ratings.ratings);
    }, [props]);

    return (
        <div>
            {
                ratings &&
                ratings.map(rating => {
                    return (
                        <div key={rating.id}>
                            <div>
                                <b>{ rating.user_name }</b>

                                {
                                    [...Array(rating.value)].map((i) => <span className="right" key={i}>*</span>)
                                }
                            </div>

                            <div>
                                { rating.opinion }
                            </div>
                            
                            <div>
                                { rating.date }
                            </div>

                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListRatings;