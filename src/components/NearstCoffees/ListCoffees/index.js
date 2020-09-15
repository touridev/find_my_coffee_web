import React from 'react';
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

                            <span>
                                {
                                    [...Array(store.ratings_average)].map((i) => <span key={i}>*</span>)
                                }
                            </span>

                            <span className="right">
                                { store.ratings_count } Opiniões
                            </span>

                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default ListEstablishments;