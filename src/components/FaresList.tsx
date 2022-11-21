import React, { Dispatch, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import blue from '@mui/material/colors/blue';
import MaterialTable from 'material-table';
import { Fare, Ticket } from '../customTypes';
import { fetchFares } from '../helpers/ApiCallHelper';
import { formatDateTime, minutesToHours, penniesToPounds } from '../helpers/dataTransformerHelper';

type FaresListProps = {
    isFetching: boolean;
    setIsFetching: Dispatch<boolean>;
    departure: string;
    arrival: string;
}

const fareColumns = [
    { title: 'Arrival time', field: 'arrivalTime' },
    { title: 'Departure time', field: 'departureTime' },
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
    const defaultMaterialTheme = createTheme({
        palette: {
            background: {
                default: '#007777',
                paper: '#33AAAA',
            },
        },
    });
    useEffect(() => {
        if (!isFetching) {
            return;
        }
        setErrorMessage('');
        fetchFares(departure, arrival)
            .then((response) => {
                response.json().then(data => ({
                    data: data,
                    status: response.status,
                }))
                    .then(res => {
                        const list: Fare[] = [];

                        for (const x of res.data.outboundJourneys) {
                            const tickets: Ticket[] = [];
                            for (const ticket of x.tickets) {
                                tickets.push({
                                    description: ticket.description,
                                    name: ticket.name,
                                    price: penniesToPounds(ticket.priceInPennies),
                                    class: ticket.ticketClass,
                                });
                            }
                            list.push({
                                arrivalTime: formatDateTime(x.arrivalTime),
                                departureTime: formatDateTime(x.departureTime),
                                destinationStation: x.destinationStation.displayName,
                                isFastestJourney: x.isFastestJourney,
                                duration: minutesToHours(x.journeyDurationInMinutes),
                                status: x.status,
                                tickets: tickets,
                            });
                        }
                        setJourneys(list);
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
            {journeys.length != 0 &&
                <div style = { { maxWidth: '100%' } } className = "table">
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
                        onRowClick = { (event, rowData, togglePanel) => rowData?.tickets.length != 0 && togglePanel ? togglePanel() : false }
                        options = { {
                            rowStyle: {
                                backgroundColor: '#77BBAA',
                            },
                            headerStyle: {
                                backgroundColor: '#007777',
                                color: 'white',
                                fontSize: 25,
                            },
                        } }/>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
};

export default FaresList;
