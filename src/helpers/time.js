import moment from 'moment';

export const getUnixTimeStamp = () => {
    return moment()
        .unix()
        .toString();
};

export const getUnixTimeStampMs = () => {
    return (
        moment()
            .unix()
            .toString() * 1000
    );
};

export const getTimeFromUnixStamp = unix => {
    return moment(unix).format('MMMM Do YYYY, h:mm:ss a');
};

export const getHoursDifference = (start, end) => {
    const delimiter = end - start > 60 * 60 * 1000 ? 'hours' : 'minutes';
    return `${moment(end).diff(start, delimiter)} ${delimiter}`;
};

export const getTimeDifferenceFromNow = start => {
    const diff = moment().diff(start) / 1000;

    if (diff > 60) {
        return Math.floor(moment.duration(moment.now() - start).asMinutes()) + ' minutes';
    } else if (diff > 3600) {
        return Math.floor(moment.duration(moment.now() - start).asHours()) + ' hours';
    } else {
        return Math.floor(moment.duration(moment.now() - start).asSeconds()) + ' seconds';
    }
};
