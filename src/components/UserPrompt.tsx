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
            <div className = { 'parent' }>
                <div className = { 'child' }>
                    <h3> Departure Station </h3>
                    <StationSelection setter = { setDeparture }/>
                </div>
                <div className = { 'child' }>
                    <h3> Arrival Station </h3>
                    <StationSelection setter = { setArrival }/>
                </div>
            </div>
            <RouteButton setIsFetching = { setIsFetching }/>
            <FaresList isFetching = { isFetching } setIsFetching = { setIsFetching } departure = { departure } arrival = { arrival }/>
        </>
    );
};
export default UserPrompt;