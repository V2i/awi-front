import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { postZone} from "../../actions/ZoneActions";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";

const AddZone = ({open = true, handleClose}) => {

    const initialZoneState = {
        zoneName: ""
    };

    const dispatch = useDispatch();
    const [zone, setZone] = useState(initialZoneState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setZone({ ...zone, [name]: value });
        } 
    };

    const saveZone = () => {
        handleClose();
        dispatch(postZone(zone));
        setZone(initialZoneState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter une nouvelle zone"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField name="zoneName" label="Nom" value={zone.zoneName} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveZone}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
    );
}

export default AddZone;