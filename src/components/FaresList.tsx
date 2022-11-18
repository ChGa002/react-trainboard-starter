import React, { Dispatch, useEffect, useState } from 'react';
import { Fare, Ticket } from '../customTypes';
import { fetchFares } from '../helpers/ApiCallHelper';

type FaresListProps = {
    isFetching: boolean;

    setIsFetching: Dispatch<boolean>;
    departure: string;
    arrival: string;
}

const FaresList: React.FC<FaresListProps> = ({ isFetching,setIsFetching, departure, arrival }) => {

    const [journeys, setJourneys] = useState<Fare[]>([]);

    useEffect(() => {
        if (!isFetching)
        {
            return;
        }
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
                        setJourneys(list);
                        console.log(list);
                    });
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsFetching(false);
            });
    }, [isFetching]);

    return (
        <div>
            {journeys.toString()}
            HELLO
        </div>
    );
};

export default FaresList;
