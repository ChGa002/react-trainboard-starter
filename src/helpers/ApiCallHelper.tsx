const baseURL = 'https://mobile-api-softwire2.lner.co.uk/v1';

export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchFares = (departure: string, arrival: string) => {

    const date = '2022-11-23';
    return fetch(`${baseURL}/fares?originStation=${departure}&destinationStation=${arrival}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundIsArriveBy=false&outboundDateTime=${date}`, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};
