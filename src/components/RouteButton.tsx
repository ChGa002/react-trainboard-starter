import React from 'react';
import { Dispatch } from 'react';
import '../App.css';

type RouteButtonProps = {
    setIsFetching: Dispatch<boolean>;
}

const RouteButton: React.FC<RouteButtonProps> = ({ setIsFetching }) => {

    return (
        <div className = { 'parent' } >
            <button className = "button" type = "button" onClick = { () => setIsFetching(true) }>Get Route</button>
        </div>
    );
};

export default RouteButton;