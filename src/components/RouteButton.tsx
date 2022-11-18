import React from 'react';
import '../App.css';

type RouteButtonProps = {
    departure: string;
    arrival: string;
}

const RouteButton: React.FC<RouteButtonProps> = ({ departure, arrival }) => {
    const hyperlink = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${departure}/${arrival}/#LiveDepResults`;

    return (
        <div>
            <a href = { hyperlink }>
                <button className = "button" type = "button">Get Route</button>
            </a>
        </div>
    );
};

export default RouteButton;