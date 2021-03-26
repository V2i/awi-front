import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { postUser} from "../../actions/UserActions";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import {generatePassword} from "../../utils";

const AddUser = ({open = false, handleClose}) => {

    const initialUserState = {
        userMail: "",
        isAdmin: false,
        userPassword: generatePassword(8)
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setUser({ ...user, [name]: value });
        }
    };

    const saveUser = () => {
        handleClose()
        const data = {
            userMail: user.userMail,
            isAdmin: user.isAdmin,
            userPassword: user.userPassword
        };
        dispatch(postUser(data));
        setUser(initialUserState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouvel utilisateur</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField name="userMail" label="Mail" value={user.userMail} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="userPassword" label="Mot de Passe" value={user.userPassword} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={saveUser}>Ajouter</Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default AddUser;