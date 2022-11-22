import JourneyOption from './models/JourneyOption';

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

export class FaresResponse extends Response {
    'numberOfAdults': number;
    'numberOfChildren': number;
    'outboundJourneys': JourneyOption[];
    'nextOutboundQuery': string;
    'previousOutboundQuery': string;
    'bookingMessages': any;
}