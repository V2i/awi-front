import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { postGameType } from "../../actions/GameTypeActions";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";

const AddGameType = ({open = true, handleClose}) => {

    const initialState = {
        gameTypeName: ""
    };

    const dispatch = useDispatch();
    const [type, setType] = useState(initialState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setType({ ...type, [name]: value });
        } 
    };

    const saveGameType = () => {
        handleClose()
        dispatch(postGameType(type));
        setType(initialState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter une nouvelle Catégorie de Jeux"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField name="gameTypeName" label="Nom" value={type.gameTypeName} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveGameType}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
        
    );
}

export default AddGameType;