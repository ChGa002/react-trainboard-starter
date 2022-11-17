import React from 'react';
import { Dispatch } from 'react';
import '../App.css';
import { Fare } from '../customTypes';

type RouteButtonProps = {
    setJourneys: Dispatch<Fare[]>;
    setClicked: Dispatch<boolean>;
}

const RouteButton: React.FC<RouteButtonProps> = ({ setJourneys, setClicked }) => {

    return (
        <div>
            <button className = "button" type = "button" onClick = { () => {setJourneys([]); setClicked(true); } }>Get Route</button>
        </div>
    );
};

export default RouteButton;