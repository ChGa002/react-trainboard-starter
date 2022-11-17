import React, { useState } from 'react';
import { Fare } from '../customTypes';
import FaresList from './FaresList';
import RouteButton from './RouteButton';
import StationSelection from './StationSelection';

const UserPrompt: React.FC = () => {
    const [departure, setDeparture] = useState('EUS');
    const [arrival, setArrival] = useState('EUS');
    const [isFetching, setIsFetching] = useState(false);
    const [journeys, setJourneys] = useState<Fare[]>([]);

    return (
        <>
            <div>
                <h2> Departure Station </h2>
                <StationSelection setter = { setDeparture }/>
                <h2> Arrival Station </h2>
                <StationSelection setter = { setArrival }/>
                <RouteButton setJourneys = { setJourneys } setClicked = { setIsFetching }/>
            </div>
            <div>
                {((isFetching && journeys.length === 0) || (!isFetching && journeys.length !=0)) &&
                    <FaresList journeys = { journeys } setJourneys = { setJourneys } setIsFetching = { setIsFetching } departure = { departure } arrival = { arrival }/>
                }
            </div>
        </>
    );
};
export default UserPrompt;