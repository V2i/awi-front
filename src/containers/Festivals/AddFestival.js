import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID, getFestivalList, postFestival} from "../../actions/FestivalActions";
import moment from "moment";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";

const AddFestival = ({open = false, handleClose}) => {

    const initialFestivalState = {
        festivalName: "",
        festivalDate: moment(),
        festivalSpace: [],
    };

    const dispatch = useDispatch();
    const [festival, setFestival] = useState(initialFestivalState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setFestival({ ...festival, [name]: value });
        } else {
            setFestival({...festival, festivalDate: event});
        }
    };

    const saveFestival = () => {
        handleClose()
        const data = {
            festivalName: festival.festivalName,
            festivalDate: festival.festivalDate,
            festivalSpace: festival.festivalSpace
        };
        dispatch(postFestival(data));
        setFestival(initialFestivalState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter un nouveau festival"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField name="festivalName" label="Nom" value={festival.festivalName} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd MM YYYY"
                                margin="normal"
                                id="date-picker"
                                label="Date picker inline"
                                value={festival.festivalDate}
                                onChange={handleInputChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveFestival}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
        
    );
}

export default AddFestival;