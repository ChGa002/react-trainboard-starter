import Moment from 'moment';

export const formatDateTime = (date: string) => {
    return Moment(date).format('DD-MM-YYYY HH:mm');
};

export const minutesToHours = (total: number) =>
{
    const minutes = total % 60 ;

    return `${Math.floor(total/60)}h${minutes > 9 ? minutes : '0' + minutes}`;
};

export const penniesToPounds = (total: number) =>
{
    const pennies = total % 100 ;

    return `£${Math.floor(total/100)}.${pennies > 9 ? pennies : '0' + pennies}`;
};