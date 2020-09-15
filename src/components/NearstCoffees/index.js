import React, { useEffect, useState } from 'react';
import ListCoffees from './ListCoffees';

import StoreService from '../../services/Local/store';

import "./style.css";

const NearstCoffees = (props) => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        loadNearstStores();
    }, []);

    async function loadNearstStores() {
        const response = await StoreService.index(props.latitude, props.longitude);
        setStores(response.data);
    }

    return (
        <div className="right-bar">
            <div className="head">
                <h2>Find My Coffee</h2>
            </div>

            <div className="body">
                <span>Mais amados perto de você</span>

                <hr />

                <ListCoffees stores={stores} />
            </div>

            <div className="signature">
                <h2>OneBitCode</h2>

                <br />

                <p>
                    Projeto Open Source desenvolvido na Semana Super Full 
                    Stack da escola online de programação <a href="https://onebitcode.com/">OneBitCode.com</a>
                </p>
            </div>
        </div>
    )
}

export default NearstCoffees;