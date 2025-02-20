import React, { useState } from 'react';
import FaresList from './FaresList';
import RouteButton from './RouteButton';
import StationSelection from './StationSelection';

const UserPrompt: React.FC = () => {
    const [departure, setDeparture] = useState('EUS');
    const [arrival, setArrival] = useState('EUS');
    const [isFetching, setIsFetching] = useState(false);

    return (
        <>
            <h2> Departure Station </h2>
            <StationSelection setStation = { setDeparture }/>
            <h2> Arrival Station </h2>
            <StationSelection setStation = { setArrival }/>
            <RouteButton setIsFetching = { setIsFetching }/>
            <FaresList isFetching = { isFetching } setIsFetching = { setIsFetching } departure = { departure } arrival = { arrival }/>
        </>
    );
};
export default UserPrompt;