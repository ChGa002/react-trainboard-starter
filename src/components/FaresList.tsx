import React, { Dispatch, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import MaterialTable from 'material-table';
import { Fare, FaresResponse, Ticket } from '../customTypes';
import { fetchFares } from '../helpers/ApiCallHelper';
import JourneyOption from '../models/JourneyOption';

type FaresListProps = {
    isFetching: boolean;
    setIsFetching: Dispatch<boolean>;
    departure: string;
    arrival: string;
}

const fareColumns = [
    { title: 'Departure time', field: 'departureTime' },
    { title: 'Arrival time', field: 'arrivalTime' },
    { title: 'Destination station', field: 'destinationStation' },
    { title: 'Fastest journey', field: 'isFastestJourney' },
    { title: 'Duration', field: 'duration' },
    {
        title: 'Status', field: 'status',
        lookup: { 'fully_reserved': 'Full', 'normal': 'Available tickets' },
    },
];

const ticketColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price' },
    { title: 'Class', field: 'class' },
];

const FaresList: React.FC<FaresListProps> = ({ isFetching, setIsFetching, departure, arrival }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [journeys, setJourneys] = useState<Fare[]>([]);
    const defaultMaterialTheme = createTheme();

    const fetchInformation = async () => {
        setErrorMessage('');
        setIsFetching(true);
        try {
            const upcomingDeparturesInformation = await fetchFares(departure, arrival);
            updateJourneysFromResponse(upcomingDeparturesInformation as FaresResponse);
        } catch (e) {
            setErrorMessage('There was a problem, please try again later');
            console.log(e);
        }
        setIsFetching(false);
    };
    const updateJourneysFromResponse = (faresResponse: FaresResponse) => {
        const upcomingDeparturesInformation = faresResponse.outboundJourneys.reduce((list: Fare[], journey: JourneyOption) => {
            list.push(new JourneyOption(journey).toFare());
            return list;
        }, new Array<Fare>());
        setJourneys(upcomingDeparturesInformation);
    };

    useEffect(() => {
        if (isFetching)
        {
            fetchInformation();
        }
    }, [isFetching]);

    return (
        <div>
            <link
                rel = 'stylesheet'
                href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
            />
            {errorMessage != '' &&
                <p> {errorMessage} </p>}
            {journeys.length != 0 &&
                <div style = { { maxWidth: '100%' } }>
                    <ThemeProvider theme = { defaultMaterialTheme }>
                        <MaterialTable columns = { fareColumns } data = { journeys } title = 'Journeys' detailPanel = { [{
                            icon: 'train',
                            tooltip: 'Show tickets',
                            render: rowData => {
                                if (rowData.tickets.length === 0) {
                                    return false;
                                }
                                return (
                                    <MaterialTable columns = { ticketColumns } data = { rowData.tickets } title = 'Tickets'/>
                                );
                            },
                        }] }
                        onRowClick = { (event, rowData, togglePanel) => rowData?.tickets.length != 0 && togglePanel ? togglePanel() : false }/>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
}

;

export default FaresList;
