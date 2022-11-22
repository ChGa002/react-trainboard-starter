import moment from 'moment/moment';

const baseURL = 'https://mobile-api-softwire2.lner.co.uk/v1';

export const fetchStations = () => {
    return fetch(`${baseURL}/stations`, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchFares = async (departure: string, arrival: string) => {

    const date = moment(new Date()).add(5, 'seconds');
    const response = await fetch(`${baseURL}/fares?originStation=${departure}&destinationStation=${arrival}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundIsArriveBy=false&outboundDateTime=${date.toISOString()}`, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });

    const json = await response.json();
    return {
        'numberOfAdults': json.numberOfAdults,
        'numberOfChildren': json.numberOfChildren,
        'outboundJourneys': json.outboundJourneys,
        'nextOutboundQuery': json.nextOutboundQuery,
        'previousOutboundQuery': json.previousOutboundQuery,
        'bookingMessages': json.bookingMessages,
    };
};
