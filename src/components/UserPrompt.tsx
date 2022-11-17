import React, { useState } from 'react';
import FaresList from './FaresList';
import RouteButton from './RouteButton';
import StationSelection from './StationSelection';

const UserPrompt: React.FC = () => {
    const [departure, setDeparture] = useState('EUS');
    const [arrival, setArrival] = useState('EUS');
    const [searching, setSearching] = useState(false);

    return (
        <>
            <div>
                <h2> Departure Station </h2>
                <StationSelection setter = { setDeparture }/>
                <h2> Arrival Station </h2>
                <StationSelection setter = { setArrival }/>
                <RouteButton clicked = { searching } setClicked = { setSearching }/>
            </div>
            <div>
                {searching &&
                    <FaresList setSearching = { setSearching } departure = { departure } arrival = { arrival }/>
                }
            </div>
        </>
    );
};
export default UserPrompt;