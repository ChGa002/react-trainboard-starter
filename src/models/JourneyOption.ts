import { Fare, Ticket } from '../customTypes';
import { minutesToHours, penniesToPounds } from '../helpers/dataTransformerHelper';

class JourneyOption {

    'destinationStation': {
        'displayName': string;
        'nlc': string;
        'crs': string;
    };
    'departureTime': string;
    'arrivalTime': string;
    'status': string;
    'primaryTrainOperator': {
        'code': string;
        'name': string;
    };
    'legs': any[];
    'tickets': [
        {
            'fareId': string;
            'fareSignature': string;
            'ftot': string;
            'ticketOptionToken': string;
            'ticketType': string;
            'ticketClass': string;
            'ticketCategory': string;
            'name': string;
            'description': string;
            'priceInPennies': number;
            'pricingItem': {
                'subTotalInPennies': number;
                'breakdown': [
                    {
                        'passenger': string;
                        'ticketCount': number;
                        'costInPennies': number;
                    }
                ];
            };
            'numberOfTickets': number;
            'isValidForLoyaltyCredit': boolean;
            'isValidForAdr': boolean;
            'outboundValidity': string;
            'inboundValidity': string;
        }
    ];
    'journeyDurationInMinutes': number;
    'isFastestJourney': boolean;
    'isOvertaken': boolean;
    'bulletins': any[];
    'stationMessages': any[];
    'isEligibleForLoyalty': boolean;

    constructor(journeys: JourneyOption) {
        return Object.assign(this, journeys);
    }

    toFare()
    {
        console.log('in my function');
        const tickets: Ticket[] = [];
        for (const ticket of this.tickets) {
            tickets.push({
                description: ticket.description,
                name: ticket.name,
                price: penniesToPounds(ticket.priceInPennies),
                class: ticket.ticketClass,
            });
        }
        return {
            arrivalTime: this.arrivalTime,
            departureTime: this.departureTime,
            destinationStation: this.destinationStation.displayName,
            isFastestJourney: this.isFastestJourney,
            duration: minutesToHours(this.journeyDurationInMinutes),
            status: this.status,
            tickets: tickets,
        } as Fare;
    }
}
export default JourneyOption;