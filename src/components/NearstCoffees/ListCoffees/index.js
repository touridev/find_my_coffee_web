import React from 'react';
import { Column } from 'rbx';

import StarYellow from '../../../assets/star_yellow.png';
import StarGray from '../../../assets/star.png';

import './style.css';
import { ColumnGroup } from 'rbx/grid/columns/column-group';

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
                                                <img src={(store.ratings_count >= index + 1) ? StarYellow : StarGray} onClick={() => console.log(index)} className="right rating_star" key={index} alt="star yellow" />
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