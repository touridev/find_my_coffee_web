import React from 'react';
import { Column } from 'rbx';

import StarYellow from '../../../assets/star_yellow.png';
import StarGray from '../../../assets/star.png';

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
                                    {
                                        [...Array(store.ratings_count)].map((key, index) => {
                                            return (
                                                <img src={StarYellow} className="rating_star" key={index} alt="star yellow" />
                                            )
                                        })
                                    }

{
                                        [...Array(5 - store.ratings_count)].map((key, index) => {
                                            return (
                                                <img src={StarGray} className="rating_star" key={index} alt="star gray" />
                                            )
                                        })
                                    }
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