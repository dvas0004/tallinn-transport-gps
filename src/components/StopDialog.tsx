import React, { Fragment } from 'react';
import { DialogTitle, Dialog, Typography, DialogContent, Button, DialogActions, Divider } from '@material-ui/core';

interface IProps {
    handleClose: any,
    handleReload: any,
    stopDialogOpen: boolean,
    stopInfo: any,
    pleaseWait: boolean
}

const StopDialog = (props: IProps) => {

    var now = new Date(),
        then = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0, 0, 0);
    const timeNowInSeconds = (now.getTime() - then.getTime()) / 1000; // difference in milliseconds

    let arrival = 0;
    let arrivalBlurb = '';

    if (props.stopInfo) {
        arrival = props.stopInfo.expectedTimeInSeconds - timeNowInSeconds;
        if (arrival > 60) {
            arrival = Math.ceil(arrival / 60);
            arrivalBlurb = `${arrival} minutes`
        } else {
            arrivalBlurb = "Less than a minute"
        }
    }

    if (props.stopDialogOpen && !props.pleaseWait){
        window.location.hash=`#stop=${props.stopInfo.id}`;
    }

    let content = <Fragment />
    if (props.pleaseWait) {
        content = <Fragment>
            <DialogTitle id="simple-dialog-title">
                <Typography variant="overline" style={{ padding: 5, fontSize: 10 }}>
                    We're busy loading
                </Typography>
            </DialogTitle>
            <DialogContent>
                Please wait...
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={props.handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Fragment>
    } else {
        content = <Fragment>
            <DialogTitle id="simple-dialog-title">
                Stop Information: {props.stopInfo ? `${props.stopInfo.name} (ID: ${props.stopInfo.id})` : ''}
                <Divider />
                <Typography variant="overline" style={{ padding: 5, fontSize: 10 }}>
                    Hint: Add this website to your bookmarks for quick reference later!
            </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" style={{ padding: 20, fontSize: 20 }}>
                    Next bus expected in: {arrivalBlurb}
                </Typography>
            </DialogContent>
            <DialogActions>

                <Button variant="outlined" color="primary" onClick={props.handleClose}>
                    Close
                </Button>
                    <Button variant="contained" color="primary" onClick={() => props.handleReload(props.stopInfo.data)}>
                        Reload
                </Button>
            </DialogActions>
        </Fragment>
    }

    return <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.stopDialogOpen}>
        {content}
    </Dialog>
}

export default StopDialog;