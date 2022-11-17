import React from 'react';
import '../App.css';
import { fetchFares } from '../helpers/ApiCallHelper';

type RouteButtonProps = {
    departure: string;
    arrival: string;
}

const RouteButton: React.FC<RouteButtonProps> = ({ departure, arrival }) => {

    return (
        <div>
            <button className = "button" type = "button" onClick = { () => fetchFares(departure, arrival) }>Get Route</button>
        </div>
    );
};

export default RouteButton;