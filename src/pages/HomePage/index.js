import React from 'react';
import GoogleMaps from '../../components/GoogleMaps';
import NearCoffees from '../../components/NearCoffees';

import './style.css';

const HomePage = () => {
    return (
        <>
            <GoogleMaps />
            <NearCoffees />
        </>
    )
}

export default HomePage;