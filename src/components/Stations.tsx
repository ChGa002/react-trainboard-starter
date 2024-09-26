import React, { Dispatch, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import MaterialTable from 'material-table';
import { fetchStations } from '../helpers/ApiCallHelper';

export type StationsList = {
    name: string;
}

type StationsProps = {
    isFetching: boolean;
    setIsFetching: Dispatch<boolean>;
}

// const stationsColumns = [
//     { title: 'Stations', field: 'name', defaultSort: 'asc' },
// ];

const Stations: React.FC<StationsProps> = ({ isFetching, setIsFetching }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [stations, setStations] = useState<StationsList[]>([]);
    const defaultMaterialTheme = createTheme();
    useEffect(() => {
        if (!isFetching) {
            return;
        }
        setErrorMessage('');
        fetchStations()
            .then((response) => {
                response.json().then(data => ({
                    data: data,
                    status: response.status,
                }))
                    .then(res => {
                        const list: StationsList[] = [];

                        for (const x of res.data.stations) {
                            list.push({
                                name: x.name,
                            });
                        }
                        list.sort();
                        setStations(list);
                        console.log(list);
                    });
            })
            .catch((err) => {
                setErrorMessage('There was a problem, please try again later');
                console.log(err);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, [isFetching]);

    return (
        <div>
            <link
                rel = "stylesheet"
                href = "https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            {errorMessage != '' &&
                <p> {errorMessage} </p>}
            {stations.length != 0 &&
                <div style = { { maxWidth: '100%' } }>
                    <ThemeProvider theme = { defaultMaterialTheme }>
                        <MaterialTable columns = { [{ title: 'Stations', field: 'name', defaultSort: 'asc' }] } data = { stations } title = 'Stations' />
                    </ThemeProvider>
                </div>
            }
        </div>
    );
};

export default Stations;

