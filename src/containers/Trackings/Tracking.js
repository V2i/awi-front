import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton, InputLabel, Select, MenuItem, FormControl, FormControlLabel, Checkbox
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Save, Create} from '@material-ui/icons';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {patchTracking} from "../../actions/TrackingActions";
import moment from "moment";
import {green} from "@material-ui/core/colors";

const Tracking = ({tracking}) => {

    const initTracking = {
        trackingWorkflow: "",
        trackingContact1: "",
        trackingContact2: "",
        trackingCR: ""
    };

    const [newTracking, setTracking] = useState(initTracking);
    const trackingWorkflowArray = ['Pas encore contacté', 'Contacté', 'Discussion en cours', 'Réservation confirmée', 'Jeux demandés', 'Jeux confirmés'];
    const user = useSelector(state => state.User);
    const reservationList = useSelector(state => state.ReservationList);
    const reservation = reservationList.data.map(r => {
        if(r.reservationTracking._id === tracking._id) return r;
        else return null;
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (event.target){
            const { name, value, checked } = event.target;
            setTracking({...newTracking, [name] : (name === "trackingCR" ? checked : value)})
        }
    };

    const changeDate = (evt) => {
        const { name, value } = evt;
        setTracking({...newTracking, [name] : value})
    };

    const saveTracking = (newTracking, reservation) => {
        dispatch(patchTracking(newTracking, reservation));
        setTracking(initTracking);
    };

    return(
        <TableRow key={newTracking._id}>
            <TableCell component="th" scope="row">
                {reservationList.data.map(r => {
                    if(r.reservationTracking._id === tracking._id) return r.reservationExhibitor.exhibitorName
                    else return ""
                })}
            </TableCell>
            <TableCell component="th" scope="row">
                {newTracking._id === tracking._id
                    ? <FormControl>
                        <InputLabel id="trackingWorkflow">Workflow</InputLabel>
                        <Select
                            labelId="trackingWorkflow"
                            id="trackingWorkflowSelect"
                            name="trackingWorkflow"
                            value={newTracking.trackingWorkflow}
                            onChange={handleChange}
                            displayEmpty
                        >
                            {trackingWorkflowArray.map(t => <MenuItem value={t} key={t}>{t}</MenuItem>)}
                        </Select>
                    </FormControl>
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
                    : (!tracking.trackingContact1 ? "Pas contacté" : moment(tracking.trackingContact1).format("DD/MM/YYYY")) }
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
                    : (!tracking.trackingContact2 ? "Pas contacté" : moment(tracking.trackingContact2).format("DD/MM/YYYY")) }
            </TableCell>
            <TableCell>
                { newTracking._id === tracking._id
                    ? <FormControlLabel
                        control={
                            <Checkbox
                                checked={newTracking.trackingCR}
                                onChange={handleChange}
                                name="trackingCR"
                                color="primary"
                            />
                        }
                        label=""/>
                    : <Checkbox
                        checked={tracking.trackingCR}
                        disabled
                        name="trackingCR"
                        color="primary"
                    />
                }
            </TableCell>
            {user.isLoggedIn
                ?
                <TableCell>
                    { newTracking._id === tracking._id
                        ? <IconButton variant="outlined" onClick={() => saveTracking(newTracking)}><Save /></IconButton>
                        : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setTracking(tracking)}><Create /></IconButton>
                    }
                </TableCell>
                :
                <></>
            }
        </TableRow>
    )
}

export default Tracking;