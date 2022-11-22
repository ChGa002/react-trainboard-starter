import React, { Dispatch } from 'react';
import Select from 'react-select';

const stations = [
    { label: 'London Euston', value: 'EUS' },
    { label: 'Finsbury Park', value: 'FPK' },
    { label: 'London Kings Cross', value: 'KGX' },
    { label: 'Cambridge', value: 'CBG' },
    { label: 'Leeds', value: 'LDS' }];

type StationSelectionProps = {
    setStation: Dispatch<string>;
}

const StationSelection: React.FC<StationSelectionProps> = ({ setStation }) => {

    return (
        <Select options = { stations } onChange = { (station) => setStation(station?.value || '') } />
    );
};

export default StationSelection;