import React, { useState, useEffect } from 'react';
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
    const [tick, updateTick] = useState(moment().unix());

    useEffect(() => {}, [tick, currentFast.start]);

    setInterval(() => {
        updateTick(moment().unix());
    }, 1000);

    const getUnixTimeStamp = () => {
        return (
            moment()
                .unix()
                .toString() * 1000
        );
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

        if (diff > 60) {
            return Math.floor(moment.duration(moment.now() - start).asMinutes()) + ' minutes';
        } else if (diff > 3600) {
            return Math.floor(moment.duration(moment.now() - start).asHours()) + ' hours';
        } else {
            return Math.floor(moment.duration(moment.now() - start).asSeconds()) + ' seconds';
        }
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
                <img className="favicon" src="/img/favicon.png" alt="FastTracker icon" />
                <Typography variant="h2" component="h1">
                    FastTracker
                </Typography>

                {currentFast.start && <Typography variant="h4">You have been fasting for {getTimeDifferenceFromNow(currentFast.start)}</Typography>}

                {!currentFast.start && <Typography variant="h4">No fast started.</Typography>}

                <Button size="large" variant="contained" color="secondary" onClick={() => toggleFast()}>
                    <AccessTimeIcon />
                    {currentFast.start ? 'Stop fast' : 'Start fast'}
                </Button>
            </Paper>

            {fasts.length > 0 && (
                <Paper>
                    <Typography variant="h4" component="h2">
                        Previous fasts
                    </Typography>

                    <div className="table-wrapper">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Start</TableCell>
                                    <TableCell>End</TableCell>
                                    <TableCell>Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fasts
                                    .slice()
                                    .reverse()
                                    .map(fast => (
                                        <TableRow key={fast.start}>
                                            <TableCell>{getTimeFromUnixStamp(fast.start)}</TableCell>
                                            <TableCell>{getTimeFromUnixStamp(fast.end)}</TableCell>
                                            <TableCell>{getHoursDifference(fast.start, fast.end)}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            )}
        </div>
    );
};

export default App;
