export type Fare = {
    arrivalTime: string;
    departureTime: string;
    destinationStation: string;
    isFastestJourney: boolean;
    duration: string;
    status: string;
    tickets: Ticket[];
}

export type Ticket = {
    description: string;
    name: string;
    price: string;
    class: string;
}
