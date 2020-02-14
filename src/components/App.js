import React, { useState, useEffect, Suspense } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
    getUnixTimeStamp,
    getUnixTimeStampMs,
    getCalendarTimeFromUnix,
    getTimeFromUnixStamp,
    getHoursDifference,
    getTimeDifferenceFromNow,
    getUnixTimeInFuture
} from '../helpers/time';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SettingsIcon from '@material-ui/icons/Settings';
import CodeIcon from '@material-ui/icons/Code';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Theme from '../theme';

const Settings = React.lazy(() => import('./Settings'));

const App = () => {
    const [fasts, addFast] = useLocalStorage('fasts', []);
    const [currentFast, changeCurrentFast] = useLocalStorage('currentFast', {
        start: false
    });
    const [tick, updateTick] = useState(getUnixTimeStamp());
    const [settingsDialogOpened, changeSettingsDialogOpened] = useState(false);
    const [notifyTime, changeNotifyTime] = useLocalStorage('notifyTime', getUnixTimeInFuture(16));

    useEffect(() => {}, [tick, currentFast.start]);

    setInterval(() => {
        updateTick(getUnixTimeStamp());
    }, 1000);

    const toggleFast = () => {
        var newStartValue = currentFast.start ? false : getUnixTimeStampMs();

        if (currentFast.start) {
            addFast([
                ...fasts,
                {
                    start: currentFast.start,
                    end: getUnixTimeStampMs()
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
                <img className="favicon" src="img/favicon.png" alt="FastTracker icon" />
                <Typography variant="h3" component="h1">
                    FastTracker
                </Typography>
                {currentFast.start && (
                    <>
                        <Typography variant="h5">
                            You have been fasting for {getTimeDifferenceFromNow(currentFast.start)}
                        </Typography>
                        <Typography variant="h5">
                            You will be done in {getTimeDifferenceFromNow(notifyTime)},{' '}
                            {getCalendarTimeFromUnix(notifyTime)}
                        </Typography>
                    </>
                )}
                {!currentFast.start && <Typography variant="h5">No fast started.</Typography>}
                <Button size="large" variant="contained" color="primary" onClick={() => toggleFast()}>
                    <AccessTimeIcon />
                    {currentFast.start ? 'Stop fast' : 'Start fast'}
                </Button>{' '}
            </Paper>

            {fasts.length > 0 && (
                <Paper>
                    <Typography variant="h5" component="h2">
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

            <Paper>
                <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => changeSettingsDialogOpened(true)}
                >
                    <SettingsIcon />
                    Settings
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        window.location.href = 'https://github.com/tonygustafsson/fasttracker';
                    }}
                >
                    <CodeIcon />
                    GitHub
                </Button>{' '}
            </Paper>

            <Suspense fallback={<div>Loading...</div>}>
                <Settings
                    open={settingsDialogOpened}
                    changeOpen={changeSettingsDialogOpened}
                    notifyTime={notifyTime}
                    changeNotifyTime={changeNotifyTime}
                />
            </Suspense>
        </div>
    );
};

export default Theme(App);
