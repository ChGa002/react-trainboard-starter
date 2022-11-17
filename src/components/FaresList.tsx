import React, { Dispatch, useEffect, useState } from 'react';
import { fetchFares, fetchStations } from '../helpers/ApiCallHelper';

type FaresListProps = {
    setSearching: Dispatch<boolean>;
    departure: string;
    arrival: string;
}

type Fare = {
    arrivalTime: string;
    departureTime: string;
    destinationStation: string;
    isFastestJourney: boolean;
    minutes: number;
    status: string;
    tickets: Ticket[];
}

type Ticket =
    {
        description: string;
        name: string;
        price: number;
        class: string;
    }
const FaresList: React.FC<FaresListProps> = ({ setSearching, departure, arrival }) => {

    // const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        fetchFares(departure, arrival)
            .then((response) => {
                response.json().then(data => ({
                    data: data,
                    status: response.status,
                }))
                    .then(res => {
                        const list: Fare[] = [];

                        for (const x of res.data.outboundJourneys) {
                            const tickets : Ticket[] = [];
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
                    });
            })
            .catch((err) => console.log(err))
            .finally(() => {
                console.log('finally');
                // setSearching(false);
            });
    }, []);

    return (
        <div>
            LIST OF FARES
        </div>
    );
};

export default FaresList;
