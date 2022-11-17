import React, { Dispatch } from 'react';
import Select from 'react-select';

const stations = [
    { label: 'London Euston', value: 'EUS' },
    { label: 'Finsbury Park', value: 'FPK' },
    { label: 'London Kings Cross', value: 'KGX' },
    { label: 'Cambridge', value: 'CBG' },
    { label: 'Leeds', value: 'LDS' }];

type StationSelectionProps = {
    setter: Dispatch<string>;
}

const StationSelection: React.FC<StationSelectionProps> = ({ setter }) => {

    return (
        <Select options = { stations } onChange = { (e) => setter(e?.value || '') } />
    );
};

export default StationSelection;