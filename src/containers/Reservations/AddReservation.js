import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getEditorList } from "../../actions/EditorActions";
import { getGameTypeList } from "../../actions/GameTypeActions";
import {
    Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
} from "@material-ui/core";
import {postReservation} from "../../actions/ReservationActions";
import {Add} from "@material-ui/icons";
import AddExhibitor from "../Exhibitors/AddExhibitor";

const AddReservation = ({open = false, handleClose}) => {

    const dispatch = useDispatch();
    const exhibitorList = useSelector(state => state.ExhibitorList);
    const festivalList = useSelector( state => state.FestivalList);

    const initialReservationState = {
        reservationExhibitor: "",
        reservationReservedSpace: [],
        reservationFestival: festivalList.data.find(f => f.isCurrent === true),
        reservationTracking: "",
        reservationComment: "",
        reservationReservedGame: [],
        reservationBilling: "",
        exhibitorVolunteerNeeded: false,
        exhibitorIsMoving: false,
    };

    const [reservation, setReservation] = useState(initialReservationState);
    const [addExhibitor, setAddExhibitor] = useState(false);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
            dispatch(getGameTypeList());
        };
        fetchData();
    }, [dispatch]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setReservation({ ...reservation, [name]: value });
        }
    };

    const saveReservation = () => {
        handleClose()
        dispatch(postReservation(reservation));
        setReservation(initialReservationState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter une reservation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={3}>
                        { exhibitorList.data &&
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="reservationExhibitor">Exhibitor</InputLabel>
                                <Select
                                    labelId="reservationExhibitor"
                                    id="reservationExhibitorSelect"
                                    name="reservationExhibitor"
                                    value={exhibitorList.data.find(e => e._id === reservation.reservationExhibitor)}
                                    onChange={handleInputChange}
                                    displayEmpty
                                >
                                    {exhibitorList.data.map(e => <MenuItem value={e._id} key={e._id}>{e.exhibitorName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setAddExhibitor(true)}>
                                <Add/>
                            </IconButton>
                            {
                                addExhibitor && <AddExhibitor open={addExhibitor} handleClose={() => setAddExhibitor(false)}/>
                            }
                        </Grid>
                        }
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={saveReservation}>Ajouter</Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddReservation;