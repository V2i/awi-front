import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {patchUser} from "../../actions/UserActions";
import { Button, TextField,FormControl} from "@material-ui/core";

const User = () => {

    const user = useSelector(state => state.User);

    const initialUser = {
        _id: user.user.userInfo._id,
        userMail: "",
        isAdmin: user.user.userInfo.isAdmin,
        userPassword: "",
    };


    const [userState, setUser] = useState(initialUser);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(patchUser(userState))
        setUser(initialUser)
    };
    

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setUser({ ...userState, [name]: value });
        } 
    };

    const showData = () => {
        if(user.isLoggedIn) {
            return (
                <>
                    <h1>Mon Compte</h1>
                    <FormControl>
                        <TextField name="userMail" label="Adresse mail" value={user.userMail} onChange={handleChange}/>
                        <TextField name="userPassword" label="Mot de passe" value={user.userMail} onChange={handleChange}/>
                        <Button onClick={handleSubmit} color="primary" autoFocus>
                            Envoyer
                        </Button>
                    </FormControl>
                </>
            )
        }
        if(!user.isLoggedIn) {
            return <p>Vous n'etes pas connecté</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default User;