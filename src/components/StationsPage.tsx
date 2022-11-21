import React, { useState } from 'react';
import Stations from './Stations';

const StationsPage: React.FC = () => {
    const [isFetching, setIsFetching] = useState(true);

    return (
        <>
            <Stations isFetching = { isFetching } setIsFetching = { setIsFetching }/>
        </>
    );
};
export default StationsPage;