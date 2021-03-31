import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getEditorList } from "../../actions/EditorActions";
import { getGameTypeList } from "../../actions/GameTypeActions";
import { Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import {postReservation} from "../../actions/ReservationActions";

const AddReservation = ({open = false, handleClose}) => {

    const initialReservationState = {
        gameName: "",
        gameMinimumAge: 0,
        gameDuration: 0,
        gameMinimumPlayers: 0,
        gameMaximumPlayers: 0,
        isPrototype: false,
        gameType:"",
        gameEditor: "",
        gameNotice: "",
    };

    const dispatch = useDispatch();
    const [reservation, setReservation] = useState(initialReservationState);
    const editorList = useSelector(state => state.EditorList);
    const gameTypeList = useSelector(state => state.GameTypeList);

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