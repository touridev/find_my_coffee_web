import React from 'react';
import { Column } from 'rbx';

import Rating from '@material-ui/lab/Rating';

import './style.css';

const ListEstablishments = (props) => {
    return (
        <>
            {
                props.stores.map(store => {
                    return (
                        <div key={store.name} className="list_establishment">
                            <b>{store.name}</b>

                            <p>
                                {store.address}
                            </p>
                            
                            <Column.Group className="listing_stores">
                                <Column>
                                    <Rating name="read-only"
                                            className="rating_stars"  
                                            value={
                                                (store.ratings_count) > 0 ?
                                                store.ratings_average : 0
                                            } readOnly />
                                </Column>

                                <Column className="right">
                                    { store.ratings_count } Opiniões
                                </Column>
                            </Column.Group>

                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default ListEstablishments;