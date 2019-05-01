import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { getUnixTimeInFuture, getHoursUntilUnix } from '../helpers/time';

const Settings = props => {
    return (
        <Dialog open={props.open || false} onClose={() => props.changeOpen()} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>Settings are automatically saved on change.</DialogContentText>

                <FormControl fullWidth>
                    <TextField
                        id="notify-hours"
                        type="number"
                        label="Notify after"
                        value={getHoursUntilUnix(props.notifyTime)}
                        onChange={e => {
                            props.changeNotifyTime(getUnixTimeInFuture(e.target.value));
                        }}
                        margin="normal"
                        helperText="Hours"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.changeOpen()} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Settings;
