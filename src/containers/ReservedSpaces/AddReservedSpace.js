import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { postReservedSpace } from "../../actions/ReservedSpaceActions";
import { Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import { getReservationByID } from '../../actions/ReservationActions';


const AddReservedSpace = ({open = false, handleClose, reservationId}) => {

    const dispatch = useDispatch();
    const [reservedSpace, setReservedSpace] = useState({});

    const reservation = useSelector(state => state.Reservation);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getReservationByID(reservationId));
        };
        fetchData();
    }, [dispatch, reservationId]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setReservedSpace({ ...reservedSpace, [name]: value });
        }
    };

    const saveReservedSpace = () => {
        handleClose()
        dispatch(postReservedSpace(reservedSpace, reservation.data));
        setReservedSpace({});
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouvel espace reservé</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={3}>
                        { reservation.data.reservationFestival.festivalSpace &&
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="reservedSpace">Espace</InputLabel>
                                <Select
                                    labelId="reservedSpace"
                                    id="reservedSpaceSelect"
                                    name="reservedSpace"
                                    value={reservation.data.reservationFestival.festivalSpace.find(e => e._id === reservedSpace._id)}
                                    onChange={handleInputChange}
                                    displayEmpty
                                >
                                    {reservation.data.reservationFestival.festivalSpace.map(e => <MenuItem value={e._id} key={e._id}>{e.spaceName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        }

                        <Grid item xs={4}>
                            <TextField name="reservedSpaceNbTable" label="Nb de Table" value={reservedSpace.reservedSpaceNbTable} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField name="reservedSpaceSurface" label="Nb de m²" value={reservedSpace.reservedSpaceSurface} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField name="reservedSpaceDiscount" label="Réduction" value={reservedSpace.reservedSpaceDiscount} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={saveReservedSpace}>Ajouter</Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddReservedSpace;