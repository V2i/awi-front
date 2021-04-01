import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Save, Create} from '@material-ui/icons';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {patchTracking} from "../../actions/TrackingActions";
import moment from "moment";

const Tracking = ({tracking}) => {

    const initTracking = {
        trackingWorkflow: "",
        trackingContact1: "",
        trackingContact2: "",
        trackingCR: ""
    };

    const [newTracking, setTracking] = useState(initTracking);
    const trackingWorkflow = ['Pas encore contacté', 'Contacté', 'Discussion en cours', 'Réservation confirmée', 'Jeux demandés', 'Jeux confirmés'];
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (event.target){
            const { name, value } = event.target;
            setTracking({...newTracking, [name] : value})
        }
    };

    const changeDate = (evt) => {
        const { name, value } = evt;
        setTracking({...newTracking, [name] : value})
    };

    const saveTracking = (newTracking) => {
        dispatch(patchTracking(newTracking));
        setTracking(initTracking);
    };

    return(
        <TableRow key={newTracking._id}>
            <TableCell component="th" scope="row">
                {newTracking._id === tracking._id
                    ? <TextField name="trackingWorkflow" label="Work" value={newTracking.trackingWorkflow} onChange={handleChange}/>
                    : tracking.trackingWorkflow
                }
            </TableCell>
            <TableCell component="th" scope="row">
                {newTracking._id === tracking._id
                    ? <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-trackingContact1"
                        name="trackingContact1"
                        value={newTracking.trackingContact1}
                        onChange={(evt) => changeDate({name: "trackingContact1", value: evt})}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    : (!tracking.trackingContact1 ? "" : moment(tracking.trackingContact1).format("DD/MM/YYYY")) }
            </TableCell>
            <TableCell component="th" scope="row">
                {newTracking._id === tracking._id
                    ? <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-trackingContact2"
                        name="trackingContact2"
                        value={newTracking.trackingContact2}
                        onChange={(evt) => changeDate({name: "trackingContact2", value: evt})}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    : (!tracking.trackingContact2 ? "" : moment(tracking.trackingContact2).format("DD/MM/YYYY")) }
            </TableCell>

            {user.isLoggedIn
                ?
                <TableCell>
                    { newTracking._id === tracking._id
                        ? <IconButton variant="outlined" onClick={() => saveTracking(newTracking)}><Save /></IconButton>
                        : <IconButton variant="outlined" onClick={() => setTracking(tracking)}><Create /></IconButton>
                    }
                </TableCell>
                :
                <></>
            }
        </TableRow>
    )
}

export default Tracking;