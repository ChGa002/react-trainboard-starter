import React, { Dispatch, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import blue from '@mui/material/colors/blue';
import MaterialTable from 'material-table';
import { Fare, Ticket } from '../customTypes';
import { fetchFares } from '../helpers/ApiCallHelper';

type FaresListProps = {
    isFetching: boolean;
    setIsFetching: Dispatch<boolean>;
    departure: string;
    arrival: string;
}

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
                                    price: ticket.priceInPennies,
                                    class: ticket.ticketClass,
                                });
                            }
                            list.push({
                                arrivalTime: x.arrivalTime,
                                departureTime: x.departureTime,
                                destinationStation: x.destinationStation.displayName,
                                isFastestJourney: x.isFastestJourney,
                                minutes: x.journeyDurationInMinutes,
                                status: x.status,
                                tickets: tickets,
                            });
                        }
                        setJourneys(list);
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

    const columns = [
        { title: 'Arrival time', field: 'arrivalTime' },
        { title: 'Departure time', field: 'departureTime' },
        { title: 'Destination station', field: 'destinationStation' },
        { title: 'Fastest journey', field: 'isFastestJourney' },
        { title: 'Duration', field: 'minutes' },
        { title: 'Status', field: 'status' },
    ];

    return (
        <div>
            {errorMessage != '' &&
                <p> {errorMessage} </p>}
            {journeys.length != 0 &&
                <div style = { { maxWidth: '100%' } } className = "table">
                    <ThemeProvider theme = { defaultMaterialTheme }>
                        <MaterialTable columns = { columns } data = { journeys } title = 'Journeys' options = { {
                            rowStyle: {
                                backgroundColor: '#77BBAA',
                            },
                            headerStyle: {
                                backgroundColor: '#007777',
                                color: 'white',
                                fontSize: 25,
                            },
                        } } />
                    </ThemeProvider>
                </div>
            }
        </div>
    );
};

export default FaresList;
