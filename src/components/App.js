import React, { useState } from 'react';
import moment from 'moment';
import useLocalStorage from '../hooks/useLocalStorage';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const App = () => {
    const [fasts, addFast] = useLocalStorage('fasts', []);
    const [currentFast, changeCurrentFast] = useLocalStorage('currentFast', {
        start: false
    });

    const getUnixTimeStamp = () => {
        return (
            moment()
                .unix()
                .toString() * 1000
        );
    };

    const getCalendarTimeFromUnixStamp = unix => {
        return moment(unix).calendar();
    };

    const getTimeFromUnixStamp = unix => {
        return moment(unix).format('MMMM Do YYYY, h:mm:ss a');
    };

    const getHoursDifference = (start, end) => {
        const delimiter = end - start > 60 * 60 * 1000 ? 'hours' : 'minutes';
        return `${moment(end).diff(start, delimiter)} ${delimiter}`;
    };

    const getTimeDifferenceFromNow = start => {
        const diff = moment().diff(start) / 1000;

        let delimiter = 'hours';
        if (diff < 60) delimiter = 'minutes';
        else if (diff < 3600) delimiter = 'seconds';

        return Math.floor(moment.duration(moment.now() - start).asSeconds()) + ' ' + delimiter;
    };

    const toggleFast = () => {
        var newStartValue = currentFast.start ? false : getUnixTimeStamp();

        if (currentFast.start) {
            addFast([
                ...fasts,
                {
                    start: currentFast.start,
                    end: getUnixTimeStamp()
                }
            ]);
        }

        changeCurrentFast({
            start: newStartValue
        });
    };

    return (
        <div className="App">
            <Paper>
                <Typography variant="h1">FastApp</Typography>

                {currentFast.start && <Typography variant="h4">You have been fasting for {getTimeDifferenceFromNow(currentFast.start)}</Typography>}

                {!currentFast.start && <Typography variant="h4">No fast started.</Typography>}

                <Button size="large" variant="contained" raised color="primary" onClick={() => toggleFast()}>
                    <AccessTimeIcon />
                    {currentFast.start ? 'Stop fast' : 'Start fast'}
                </Button>
            </Paper>

            {fasts.length > 0 && (
                <Paper>
                    <Typography variant="h2">Previous fasts</Typography>

                    <Table>
                        <TableHead>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableHead>
                        <TableBody>
                            {fasts.reverse().map(fast => (
                                <TableRow>
                                    <TableCell key={fast.start}>{getTimeFromUnixStamp(fast.start)}</TableCell>
                                    <TableCell>{getTimeFromUnixStamp(fast.end)}</TableCell>
                                    <TableCell>{getHoursDifference(fast.start, fast.end)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </div>
    );
};

export default App;
