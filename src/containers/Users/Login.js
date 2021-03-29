import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import {login} from "../../actions/UserActions";

const Login = ({open = false, handleClose}) => {

    const initialUserState = {
        userMail: "",
        userPassword: ""
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setUser({ ...user, [name]: value });
        }
    };

    const tryLogin = () => {
        handleClose()
        const data = {
            userMail: user.userMail,
            userPassword: user.userPassword
        };
        dispatch(login(data));
        setUser(initialUserState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Connectez vous</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField name="userMail" label="Mail" value={user.userMail} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="userPassword" label="Mot de Passe" type="password" value={user.userPassword} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={tryLogin}>Connexion</Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Login;