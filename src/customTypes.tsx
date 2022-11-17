export type Fare = {
    arrivalTime: string;
    departureTime: string;
    destinationStation: string;
    isFastestJourney: boolean;
    minutes: number;
    status: string;
    tickets: Ticket[];
}

export type Ticket =
    {
        description: string;
        name: string;
        price: number;
        class: string;
    }
