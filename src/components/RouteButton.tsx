import React from 'react';
import { Dispatch } from 'react';
import '../App.css';

type RouteButtonProps = {
    clicked: boolean;
    setClicked: Dispatch<boolean>;
}

const RouteButton: React.FC<RouteButtonProps> = ({ clicked, setClicked }) => {

    return (
        <div>
            <button className = "button" type = "button" onClick = { () => setClicked(true) }>Get Route</button>
        </div>
    );
};

export default RouteButton;