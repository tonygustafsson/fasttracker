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

export const getUnixTimeInFuture = hours => {
    return (
        moment()
            .add(hours, 'hours')
            .unix() * 1000
    );
};

export const getHoursUntilUnix = unix => {
    return moment(unix).diff(moment(), 'hours') + 1;
};

export const getTimeFromUnixStamp = unix => {
    return moment(unix).format('MMMM Do YYYY, h:mm:ss a');
};

export const getCalendarTimeFromUnix = unix => {
    return moment(unix)
        .calendar()
        .toLowerCase();
};

export const getHoursDifference = (start, end) => {
    const delimiter = end - start > 60 * 60 * 1000 ? 'hours' : 'minutes';
    return `${moment(end).diff(start, delimiter)} ${delimiter}`;
};

export const getTimeDifferenceFromNow = unixStart => {
    let diffInSeconds = moment(unixStart).diff(moment(), 'seconds');
    if (diffInSeconds < 0) diffInSeconds = Math.abs(diffInSeconds);

    if (diffInSeconds >= 3600) {
        let diffInHours = moment().diff(moment(unixStart), 'hours');
        if (diffInHours < 0) diffInHours = Math.abs(diffInHours);
        return diffInHours + ' hours';
    } else if (diffInSeconds >= 60) {
        let diffInMinutes = moment().diff(moment(unixStart), 'minutes');
        if (diffInMinutes < 0) diffInMinutes = Math.abs(diffInMinutes);
        return diffInMinutes + ' minutes';
    } else {
        let diffInSeconds = moment().diff(moment(unixStart), 'seconds');
        if (diffInSeconds < 0) diffInSeconds = Math.abs(diffInSeconds);
        return diffInSeconds + ' seconds';
    }
};
