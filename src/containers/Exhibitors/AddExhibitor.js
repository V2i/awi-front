import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { postExhibitor} from "../../actions/ExhibitorActions";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";

const AddExhibitor = ({open = false, handleClose}) => {

    const initialExhibitorState = {
        exhibitorName: ""
    };

    const dispatch = useDispatch();
    const [exhibitor, setExhibitor] = useState(initialExhibitorState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setExhibitor({ ...exhibitor, [name]: value });
        } 
    };

    const saveExhibitor = () => {
        handleClose()
        dispatch(postExhibitor(exhibitor));
        setExhibitor(initialExhibitorState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter un nouvel exposant"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField name="exhibitorName" label="Nom" value={exhibitor.exhibitorName} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveExhibitor}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
        
    );
}

export default AddExhibitor;