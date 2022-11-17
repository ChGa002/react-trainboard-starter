import React, { useEffect, useState } from 'react';
import { fetchFares, fetchStations } from '../helpers/ApiCallHelper';

const FaresList: React.FC = (props) => {

    // const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        fetchFares(props.departure, props.arrival)
            .then((value) => console.log(value))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    return (
        <div>
            Stations!
        </div>
    );
};

export default FaresList;
